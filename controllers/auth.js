const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generarjwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verificar si el correo existe
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: 'Usuario inexistente, registrese para usar la aplicacion'
            });
        }
        //verificamos que el usuario este activo
        if (user.state === false) {
            return res.status(404).json({
                msg: 'Usuario no esta activo'
            });
        }

        //verificamos la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                msg: 'Usuario y/o contraseña no son correctos'
            });
        }

        const token = await generarJWT(user.id);
        console.log(token);
        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log('error del login', error);
        return res.status(500).json({
            msg: 'Algo salio mal, comuniquese con el administrador'
        })

    }
}


module.exports = {
    login
}