
const { Router } = require('express');
const { check } = require('express-validator');
const { login, validToken } = require('../controllers/auth');
const { validar_campos } = require('../middleware/validar_campos');
const { validatejwt } = require('../middleware/validatejwt')

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos
], login)

router.post('/auth', validatejwt, validToken)

module.exports = router;