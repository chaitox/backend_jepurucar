
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validar_campos } = require('../middleware/validar_campos');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos
], login)

module.exports = router;