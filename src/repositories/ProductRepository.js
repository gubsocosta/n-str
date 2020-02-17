'use strict'

const Product = require('../models/Product');

exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'title slug price');

    return res;
};

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug,
        active: true,
    }, 'title description price tags');

    return res;
};

exports.getById = async (id) => {
    const res = await Product.findById(id);

    return res;
};

exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'title slug description price tags');

    return res;
};

exports.store = async (data) => {
    const product = new Product(data);
    
    await product.save();
};

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, data);
};

exports.destroy = async (id) => {
    await Product.findByIdAndRemove(id);
};