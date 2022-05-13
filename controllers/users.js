const { response, request } = require('express');
const bcrypjs = require('bcryptjs')

const User = require('../models/user');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = async (req, res = response) => {

    const { username, email, password, role, phoneNumber } = req.body;
    const user = new User({ username, email, password, role, phoneNumber });

    /*Verificamos si el correo ya existe en la base de datos */
    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado.'
        });
    }

    /*Encriptamos la contraseña */
    const salt = bcrypjs.genSaltSync();
    user.password = bcrypjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;
    const { role } = req.user;
    if (role != 'ADMIN') {
        return res.status(401).json({
            msg: 'Solo el usuario con rol ADMIN puede inactivar la cuenta'
        })
    }
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.status(200).json({ user });

}




module.exports = {
    usuariosGet,
    userPost,
    usuariosPut,
    usuariosPatch,
    userDelete,
}