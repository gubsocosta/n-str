'use strict'

const Product = require('../models/Product');

exports.get = () => {
    return Product.find({
        active: true
    }, 'title slug price');
};

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug,
        active: true,
    }, 'title description price tags');
};

exports.getById = (id) => {
    return Product.findById(id);
};

exports.getByTag = (tag) => {
    return Product.find({
        tags: tag,
        active: true
    }, 'title slug description price tags')
};

exports.store = (data) => {
    const product = new Product(data);
    return product.save();
};

exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, data);
};

exports.destroy = (id) => {
    return Product.findByIdAndRemove(id);
};