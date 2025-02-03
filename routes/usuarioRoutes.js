import express from 'express';
import { formLogin, formRegistro, formRecuperar, registrar, confirmar } from '../controllers/userController.js';


const router = express.Router();  

//routing RUTAS
router.get('/login', formLogin);

router.get('/registro', formRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar);


router.get('/recuperar-cuenta', formRecuperar);


export default router