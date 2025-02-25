import express from 'express'

import protectRouter from '../middelware/protectRoute.js';

import { body,  } from 'express-validator';
import { admin, crear, guardar } from '../controllers/propertiesController.js'



const router = express.Router();

router.get('/mis-propiedades', protectRouter, admin);
router.get('/propiedades/crear',protectRouter,  crear);
router.post('/propiedades/crear',  
    protectRouter,
    body('titulo').notEmpty().withMessage('El título es obligatorio.'),  
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({max: 200}).withMessage('La descripción no puede tener más de 200 caracteres.'),  
    body('categoria').isNumeric().withMessage('Selecciona una categoría.'),  
    body('habitaciones').isNumeric().withMessage('Selecciona cantidad de habitaciones.'),  
    body('estacionamiento').isNumeric().withMessage('Selecciona cantidad de estacionamientos.'),  
    body('wc').isNumeric().withMessage('Selecciona cantidad de wc.'),  
    body('precio').isNumeric().withMessage('Selecciona un rango de precio.'),  
    body('lat').isNumeric().withMessage('Ubica la propiedad en el mapa.'),  
    guardar
);

export default router;