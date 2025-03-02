const express = require('express');
const router = express.Router();
const TanquesController = require('../controllers/tanques');

router.post("/create", TanquesController.create);
router.get("/list", TanquesController.list);


module.exports = router;