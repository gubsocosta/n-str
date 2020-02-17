'use strict'

const Order = require('../models/Order');

exports.store = async (data) => {
    const order = new Order(data);

    await order.save();
};