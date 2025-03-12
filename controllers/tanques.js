const {status} = require('express/lib/response');
const validator = require('validator');
const Tanques = require('../models/Tanques');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');

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
 /* Filtros por fechas ***************************************************************************************/       
        //Extraemos los parametros de la fecha desde la consulta
        const {startDate, endDate} = req.query;

        //Creamos el objeto de filtros para las fechas
        let filtrosFecha = {};

        //Si se pasa startDate, agregamos la condición para fechas mayores o iguales
        if(startDate){
            filtrosFecha.fecha = { $gte: new Date(startDate)}; //Fechas mayores o iguales a startDate
        }
        
        //Si se pasa endDate, agregamos la condicion de fechas menores o iguales
        if(endDate){
            filtrosFecha.fecha = filtrosFecha.fecha || {}; //Si ya existe un filtro mantenemos
            filtrosFecha.fecha.$lte = new Date(endDate); //Fechas menores o iguales a endDate
        }
/************************************************************************************************************ */
        const tanque = await  Tanques.find({}).sort({fecha: -1});
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

/* Sacar un solo articulo ****************************************************************************************/
const uno = async (req, res) => {
    // Recoger un id por la URL
    let id = req.params.id;

    try {
        // Buscar el artículo
        const tanque = await Tanques.findById(id);

        // Si no existe, devolverá un error
        if (!tanque) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });
        }

        // Devolver resultado exitoso
        return res.status(200).json({
            status: "success",
            tanque: tanque
        });
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar el artículo",
            error: error.message
        });
    }
}

/* Borrar un articulo ********************************************************************************************/
const borrar = async (req, res) => {
    let id = req.params.id; //Obtener id desde los parametros de la url
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: "error",
            mensaje: "ID proporcionado es invalido "
        });
    }

    try {
      //Buscar y eliminar el articulo por su id
        const tanqueEliminado = await Tanques.findByIdAndDelete(id);

      //Verificar si el tanque no fue encontrado
      if(!tanqueEliminado){
        return res.status(404).json({
            status: "error",
            mensaje: "No se a encontrado el articulo para eliminar"
        });
      }

      // Si se encuentra el articulo y elimina el tanque
      return res.status(200).json({
        status: "success",
        mensaje: "articulo eliminado correctamente",
        tanque: tanqueEliminado
      });

    } catch (error) {
    //   //Si ocurre un error, devolvemos un mensaje de error
        console.log("Error al eliminar articulo: ",error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar articulo",
            error: error.message
        });
    }
}
/************************************************************************************************************/


module.exports = {
    create,
    list,
    uno,
    borrar
};
