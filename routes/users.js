
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosPut,
    userPost,
    userDelete,
    usuariosPatch } = require('../controllers/users');
const { validar_campos } = require('../middleware/validar_campos');
const { validatejwt } = require('../middleware/validatejwt')

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('email', 'El correo no es valido').isEmail(),
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos], userPost);

router.delete('/:id', validatejwt, userDelete);

router.patch('/', usuariosPatch);





module.exports = router;