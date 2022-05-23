const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
    brandName: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la marca es obligatorio']
    },
    brandImg: {
        type: String
    }
});

BrandSchema.methods.toJSON = function () {
    const { __v, _id, ...brand } = this.toObject();
    brand.uid = _id;
    return brand;
}
module.exports = model('Brand', BrandSchema)
