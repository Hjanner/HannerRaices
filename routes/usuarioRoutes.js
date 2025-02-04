import express from 'express';
import { formLogin, formRegistro, formRecuperar, registrar, confirmar, resetPassword, comprobarToken, newPassword } from '../controllers/userController.js';


const router = express.Router();  

//routing RUTAS
router.get('/login', formLogin);

router.get('/registro', formRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar);

router.get('/recuperar-cuenta', formRecuperar);
router.post('/recuperar-cuenta', resetPassword);

//gestion de resetPassword
router.get('/recuperar-cuenta/:token', comprobarToken);
router.post('/recuperar-cuenta/:token', newPassword);


export default router