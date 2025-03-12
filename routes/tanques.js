const express = require('express');
const router = express.Router();
const TanquesController = require('../controllers/tanques');

router.post("/create", TanquesController.create); // Ruta para crear articulos
router.get("/list", TanquesController.list); // Ruta para optener lista de articulos
router.get("/list/:id", TanquesController.uno); // Ruta para optener 1 articulo en especifico por id
router.delete("/list/:id", TanquesController.borrar); // Ruta para borrar un articulo por su id


module.exports = router;