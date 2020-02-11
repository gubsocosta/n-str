'use strict'

const mongoose = require('mongoose');

const uri = 'mongodb://root:secret@mongo:27017/admin';

mongoose.connect(uri, { useNewUrlParser: true })
    .catch(err => console.error('Error: ' + err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
