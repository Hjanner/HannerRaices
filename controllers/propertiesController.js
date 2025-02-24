import { validationResult } from 'express-validator';

// import Prices from '../models/Price.js';
// import Categories from '../models/Category.js'
// import Properties from '../models/Property.js'
import { Price, Category, Property} from '../models/index.js'

import csurf from 'csurf';

const admin = (req, res) => {
    res.render('properties/admin', {
        pagina: 'Mis propiedades',
        header: true,
    })
}

const crear = async (req, res) => {
    //consultar modelos
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ])


    res.render('properties/crear', {
        pagina: 'Crear Propiedad',
        header: true,
        csrfToken: req.csrfToken(),
        datos: {},
        categories,
        prices
    })
}

const guardar = async(req, res) =>{

    //mostrar errores de validacion
    let validacion = validationResult(req);

    if (!validacion.isEmpty()) {
            //consultar modelos
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ])

        return res.render('properties/crear', {
            pagina: 'Crear Propiedad',
            header: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            datos: req.body,
            errores: validacion.array()
        })
    }

    //crear un registro
   const { titulo, description, habitaciones, estacionamiento, wc, calle, lat, lng, precio: priceId, categoria: caregoryId, usuario} = req.body;

   console.log(req.body);
   

    try {
        const propertySave = await Property.create({
            titulo,
            description,
            habitaciones,
            estacionamiento,
            wc,
            calle, 
            lat,
            lng,
            precio,
            categoria,
        })

    } catch (error) {
        //console.log(error);
    }
}

export{
    admin,
    crear,
    guardar
}