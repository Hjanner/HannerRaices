import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS ?? '', 
    {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,             //maximo de conexiones
        min: 0,             //min
        acquire: 30000,     //tiempo antes de lanzar un error en mls
        idle: 10000         //tiempo que debe transcurrir para terminar una conexion con la db sino hay actividad
    },
    operatorAliases: false
})

export default db;
