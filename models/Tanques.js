const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const TanqueSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    capacidad: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    reforzamiento: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    precioOferta: {
        type: String,
        default: 0
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    },
    descripcion: {
        type: String,
    }

});

module.exports = model("Tanques", TanqueSchema, "tanques");