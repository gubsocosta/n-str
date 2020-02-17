'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    paswword: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);