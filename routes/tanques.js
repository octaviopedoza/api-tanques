const express = require('express');
const router = express.Router();
const TanquesController = require('../controllers/tanques');

router.post("/create", TanquesController.create);
router.get("/list", TanquesController.list);
router.get("/list/:id", TanquesController.uno);


module.exports = router;