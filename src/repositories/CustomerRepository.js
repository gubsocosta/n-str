'use strict'

const Customer = require('../models/Customer');

exports.store = async (data) => {
    const customer = new Customer(data);
    await customer.save();
};