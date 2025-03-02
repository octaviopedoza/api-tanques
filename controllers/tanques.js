const {status} = require('express/lib/response');
const validator = require('validator');
const Tanques = require('../models/Tanques');
const res = require('express/lib/response');

const create = async(req, res) => {
    let param = req.body;

    try {
        let validador_nombre = !validator.isEmpty(param.nombre);
        let validador_marca = !validator.isEmpty(param.marca);
        let validador_capacidad = !validator.isEmpty(param.capacidad);
        let validador_color = !validator.isEmpty(param.color);
        let validador_reforzamiento = !validator.isEmpty(param.reforzamiento);
        let validador_precio = !validator.isEmpty(param.precio);

        if(!validador_nombre || !validador_marca || !validador_capacidad || !validador_color || !validador_reforzamiento || !validador_precio){
            throw new Error("Información no validada"); 
        }
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Faltan datos por enviar"
        });
    }

    const tanque = new Tanques(param);

    try {
        const tanqueGuardado = await tanque.save();
        return res.status(200).json({
            status: "success",
            tanque: tanqueGuardado,
            mensaje: "producto guardado",
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al guardar los datos dentro de la DB",
            error: error.message
        });
    }
}

const list = async(req, res) => {
    try {
        const tanque = await  Tanques.find({});
        if(!tanque || tanque.length === 0){
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontraron registros de tanques"
            });
        }
        return res.status(200).json({
            status: "success",
            tanques: tanque
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en la consulta de la DB",
            error: error.message
        });
    }
}

module.exports = {
    create,
    list
};