'use strict'

const express = require('express');
const controller = require('../controllers/CustomerController');
const router = express.Router();

router.post('/', controller.post);

module.exports = router;