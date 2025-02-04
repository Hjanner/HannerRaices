import { body, check, validationResult } from 'express-validator';
import User from '../models/Usuario.js';
import { json } from 'sequelize';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidoPassword } from '../helpers/email.js';
import csurf from 'csurf';
import bcrypt from 'bcrypt';


//renderizando
const formLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}

const formRegistro = (req, res) => {
    //console.log(req.csrfToken);

    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()                  //creando token de validacion de form que venga de la url
    })
}

//   REGISTRANDO   funcion asincrona que revisa la db 
const registrar = async (req, res) => {
    //validacion
    await check('name').notEmpty().withMessage('El nombre es obligatorio.').run(req)
    await check('email').isEmail().normalizeEmail().withMessage('Correo no válido.').run(req)
    await check('password').isLength({min: 3}).withMessage('La contraseña debe tener mínimo 3 caracteres.').run(req)
    //await check('confirm_password').equals('password').withMessage('Las contraseña no son iguales.').run(req)
    let result = validationResult(req);             //tomando lo que arroje la validacion y me dice cual es

    const { name, email, password } = req.body;         //extraer los datos del body, distruction
    
    //mostrar errores
    if(!result.isEmpty()){
        //console.log(req.body);
        //console.log(result.array());
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta', 
            csrfToken: req.csrfToken(),
            errores: result.array(),
            user:{      //esto es para rellenar los campos que estaban buenos 
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    //user no duplicado, realizamos una consulta en la db y buscamos con .findOne
    const userDupliccado = await User.findOne({ where: { email }})
    if(userDupliccado){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta', 
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email usado ya se encuentra registrado.' }],
            user:{      //esto es para rellenar los campos que estaban buenos 
                name: req.body.name,
                email: req.body.email
            }
        });
    }
    
    //almacenar usuario y crearlo al mismo tiempo
    const userCreado = await User.create({
        name,
        email,
        password,
        token: generarId()
    })

    //enviar email de confirmacion
    emailRegistro({
        name: userCreado.name,
        email: userCreado.email,
        token: userCreado.token
    })

    //mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Cuenta creada correctamente',
        mensaje: '!Saludos ' + name + '! Hemos enviado un Email de confirmación a ' + email 
    })
}

//funcion para confirmar correo
const confirmar = async (req, res) => {
    //const {tokenEnviado} =  req.params.token       //extraer el token de la url
    const token =  req.params.token;                //extraer el token de la url
    
    //verificar si el token es valido consultando la db y tomo es usuario si existe
    const user = await User.findOne({where: {token: token}})
    
    if(!user){      //caso de que el token no exista
        return res.render('templates/confirmar-cuenta', {
            pagina: 'Error al confirmar cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta',
            error: true        
        })
    }

    //confirmando usuario
    user.token = null;
    user.confirmado = true;
    await user.save();                //guardando cambios

    res.render('templates/confirmar-cuenta', {
        pagina: 'Cuenta confirmada cuenta',
        mensaje: 'Su cuenta a sido confirmada exitosamente'
    })        
}

const formRecuperar = (req, res) => {    
    res.render('auth/recuperar-cuenta', {
        pagina: 'Recuperar Contreseña',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async (req, res) => {
    //validacion
    await check('email').isEmail().normalizeEmail().withMessage('Correo no válido.').run(req)
    let result = validationResult(req);             //tomando lo que arroje la validacion y me dice cual es
    
    //si hay errores, mostrar
    if(!result.isEmpty()){
        return res.render('auth/recuperar-cuenta', {
            pagina: 'Recuperar Contreseña', 
            csrfToken: req.csrfToken(),
            errores: result.array(),
        });
    }

    //en caso de que exista el email
    const {email} = req.body;                                                           //tomamos el email de la url
    const user = await User.findOne({ where: {email} });                                //consulta en la base de datos
    
    //caso que no existe un usuario asociado al correo
    if(!user){
        return res.render('auth/recuperar-cuenta', {
            pagina: 'Recuperar Contreseña', 
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El correo no está asociado a ningún usuario.'}],
        });        
    }


    user.token = generarId();                           //generar token     
    user.save();                                        //guardamos el user con un nuevo token

    //enviar email de confirmacion
    emailOlvidoPassword({
        name: user.name,
        email: user.email,
        token: user.token
    })

    //renderizar vista
    res.render('templates/mensaje',{
        pagina: 'Restaurar contraseña.',
        mensaje: '!Saludos ' + user.name + '! Hemos enviado un Email de confirmación a ' + email + ' para restaurar tu contraseña.'
    })

}

const comprobarToken = async (req, res) =>{
    //const {tokenEnviado} =  req.params.token       //extraer el token de la url
    const token =  req.params.token;                //extraer el token de la url
    
    //verificar si el token es valido consultando la db y tomo es usuario si existe
    const user = await User.findOne({where: {token: token}})
    
    if(!user){      //caso de que el token no exista
        return res.render('templates/confirmar-cuenta', {
            pagina: 'Error al restaurar contraseña',
            mensaje: 'Hubo un error al intentar restaurar contraseña.',
            error: true        
        })
    }

    res.render('auth/reset-password', {
        pagina: 'Restaurar contraseña',
        mensaje: 'Su contraseña a sido resturada exitosamente.',
        csrfToken: req.csrfToken(),
    })        
}

const newPassword = async (req, res) =>{
    //validar nueva password
    await check('password').isLength({min: 3}).withMessage('La contraseña debe tener mínimo 3 caracteres.').run(req)
    //await check('confirm_password').equals('password').withMessage('Las contraseña no son iguales.').run(req)
    let result = validationResult(req);             //tomando lo que arroje la validacion y me dice cual es
    
    //mostrar errores
    if(!result.isEmpty()){
        //console.log(req.body);
        //console.log(result.array());
        return res.render('auth/reset-password', {
            pagina: 'Restaurar contraseña', 
            csrfToken: req.csrfToken(),
            errores: result.array(),
        });
    }

    //identificar al usuario que realiza el cambio y ajustando token
    const { password } = req.body;                                  //extraer los datos del body, distruction
    const token =  req.params.token;                               //extraer el token de la url
    const user = await User.findOne({where: {token: token}})
    user.token = null;

    //hashear nueva password y guardar
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)  

    await user.save();  

    res.render('templates/confirmar-cuenta', {
        pagina: 'Restaurar contraseña',
        mensaje: 'Su contraseña a sido restairada exitosamente'
    })    
}

export {
    formLogin,
    formRegistro,
    formRecuperar, 
    registrar,
    confirmar,
    resetPassword, 
    comprobarToken, 
    newPassword
}