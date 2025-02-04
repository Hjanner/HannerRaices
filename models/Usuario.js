import { DataTypes } from "sequelize";  
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const User = db.define('usuarios', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
        },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    //aqui va a pasar despues de darle al boton de enviar al momento de crear el usuario, y va a tomar la password para hashearla
    hooks:{
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)  
        }
    }
})

//metodos personalizados
User.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

export default User;
