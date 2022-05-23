const { request, response } = require('express');
const Brand = require('../models/brand');

const brandGet = async (req, res = response) => {
    console.log('aqui');
    const brand = await Brand.find();
    res.status(200).json({
        brand
    });
};

const brandPost = async (req, res = response) => {
    try {
        const brand = new Brand(req.body);
        brand.save();
        res.status(200).json({
            msg: 'Marca creada',
            brand
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

};

module.exports = {
    brandPost,
    brandGet
}
