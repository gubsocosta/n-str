'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.store = async (data) => {
    const customer = new Customer(data);
    await customer.save();
};