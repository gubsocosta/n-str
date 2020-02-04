'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Database connection
mongoose.connect('mongodb+srv://node-str:nZ8xYley1DMXA0SZ@node-str-4gdhx.azure.mongodb.net/test?retryWrites=true&w=majority');

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;