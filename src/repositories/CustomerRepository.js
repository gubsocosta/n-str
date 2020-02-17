'use strict'

const Customer = require('../models/Customer');

exports.get = async () => {
    const res = await Customer.find({});

    return res;
};

exports.store = async (data) => {
    const customer = new Customer(data);
    await customer.save();
};