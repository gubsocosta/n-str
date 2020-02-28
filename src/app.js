'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database/index');

const app = express();
 
// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const indexRoute = require('./routes/indexRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');

app.use('/', indexRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
app.use('/products', productRoute);

module.exports = app;