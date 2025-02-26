const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const TanqueSchema = Schema({
    Nombre: {
        type: String,
        required: true
    },
    Marca: {
        type: String,
        required: true
    },
    Capacidad: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    Reforzamiento: {
        type: Number,
        required: true
    },
    Precio: {
        type: Boolean,
        required: true
    },
    PrecioOferta: {
        type: Boolean,
        default: 0
    },
    Fecha: {
        type: Date,
        default: Date.now
    },
    Imagen: {
        type: String,
        default: "default.png"
    }

});

module.exports = model("Tanques", TanqueSchema, "tanques");