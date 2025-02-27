const {status} = require('express/lib/response');
const validator = require('validator');
const Tanques = require('../models/Tanques');
const res = require('express/lib/response');

const create = (req, res) => {
    return res.status(200).json({
        mensaje: "Respuesta a controlador create"
    })
}

module.exports = {
    create
};