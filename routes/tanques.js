const express = require('express');
const router = express.Router();
const TanquesController = require('../controllers/tanques');

router.get("/create", TanquesController.create);


module.exports = router;