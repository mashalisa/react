const express = require('express');
const router = express.Router();
const budjetsController = require('../controllers/budjetsController');


router.get('/budjets', budjetsController.getAllBudjets);

module.exports = router;
