//const express = require('express');            //lenguaje JS     //asignamos la dependencia
import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'    
import usuariosRouters from './routes/usuarioRoutes.js'
import db from './config/db.js'

//crear app, serv.                                  // esta es la instancia de nuestra app de express
const app = express();                              // llamamos a la funcion, var que contiene toda las funciones del ser que estamos creando

//habilitar lectura de dats de formulari (Middleware para parsear)
app.use( express.urlencoded({extended: true}) )

//habilitar cookieParser
app.use( cookieParser() );
//habilitar csrf
app.use( csrf( {cookie : true} ) )


//habilitando extensiones de TEMPLATE
app.set('view engine', 'pug')   //importando dependencia
app.set('views', './views')     // en que carpeta va a encontrar los archivos

//CARPETA PUBLICA 
app.use( express.static('public') )

//routing
app.use('/auth', usuariosRouters);

//conexion db
try{
    await db.authenticate();
    db.sync();
    console.log('Conexion establecida con la Base de Datos');
} catch (error){
    console.log(error);
    
}


//def puerto 
const port = process.env.PORT || 918
app.listen(port, () => {
    console.log(`La aplicacion funciona en el puerto ${port}`);
});
