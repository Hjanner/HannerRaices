import jwt from 'jsonwebtoken'

const generateJWT = (datos) => jwt.sign({ id: datos.id, name: datos.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d'})

const generarId = () =>  Math.random().toString(32).substring(2) + Date.now().toString(32);

export{
    generateJWT,
    generarId
}