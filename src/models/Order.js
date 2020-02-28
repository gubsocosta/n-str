'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);