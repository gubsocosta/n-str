'use strict'

const Order = require('../models/Order');

exports.get = async() => {
    const res = await Order.find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');

    return res;
};

exports.store = async(data) => {
    const order = new Order(data);

    await order.save();
};