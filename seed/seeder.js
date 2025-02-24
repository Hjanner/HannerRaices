import categories from './categories.js';
import prices from './price.js';

// import Categories from '../models/Category.js';
// import Prices from '../models/Price.js';

import { Category, Price,  } from '../models/index.js'   //importa modelos y asociaciones

import db from '../config/db.js';
import {exit} from 'node:process';
import { log } from 'node:console';

const importarDatos = async() => {
    try {
        //auth db
        await db.authenticate()

        //generar  columnas
        await db.sync()

        //insertar datos
        //await Categories.bulkCreate(categories);          //funcion para insertar too los datos  
        //cuando son dos querys independientes, se usa un Promise
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
        ]);

        console.log('Datos importados correctamente.');
        exit(0);                                                //proceso terminado de manera correcta
        
    } catch ( error) {
        console.log(error);
        exit(1);                                                 //forma de terminar todos los procesos, y el 1 es porque hubo un error
    }
}

const eliminarDatos = async () => {
    try {
        // Category.destroy({where: {}, truncate: true},);
        // Price.destroy({where: {}, truncate: true});
//o
        await db.sync({force: true});   //borra todo

        console.log('Datos eliminados correctamente');
        exit();
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2] === "-i"){           //i de importar
    importarDatos(); 
}

if(process.argv[2] === "-e"){           //e de eliminar
    eliminarDatos(); 
}
