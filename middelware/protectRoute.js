 import jwt from "jsonwebtoken";
 import {Usuario} from '../models/index.js'

 const protectRouter = async (req, res, next) => {

    //verificar si eciste token
    const {_token} = req.cookies;
    if (!_token) {        
        return res.redirect('/auth/login');
    }


    //validar token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET_KEY);     //verifica que el tken sea valido
        const user = await Usuario.scope('deletePassword').findByPk(decoded.id);
        console.log(user);
        
        //almacenar el usuario de en el req
        if (user) {
            req.user = user;                //creamos la propiedad user en el req y le asignamos el user que validamos
        } else {
            return res.redirect('/auth/login');
        }

        return next();              //para que pase al siguiente middle
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login');
    }
 }

 export default protectRouter;