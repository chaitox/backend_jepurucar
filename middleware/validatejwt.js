
const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validatejwt = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'El usuario no esta autenticado'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWTSECRETEKEY);

        req.user = await User.findById(uid);

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido!'
        })
    }
}


module.exports = {
    validatejwt
}