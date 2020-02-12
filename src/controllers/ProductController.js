'use strict'

const Product = require('../models/Product');

exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title slug price')
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(400).send({
                message: 'Failed to get records',
                data: err
            })
        })
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true,
    }, 'title description price tags')
        .then(data =>res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
}; 

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title slug description price tags')
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
}; 

exports.post = (req, res, next) => {
    const product = new Product(req.body)

    product.save()
        .then(response => {
            console.log(response);

            res.status(201).send({
                message: 'Product successfully registered.'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Failed to register the product.',
                data: err
            })
        })
};

exports.put = (req, res, next) => {
    const { title, slug, description, price } = req.body;

    Product.findByIdAndUpdate(req.params.id,{ title, slug, description, price })
        .then(response => {
            res.status(200).send({
                message: 'Product updated successfully.'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Failed to update the product.',
                data: err,
            });
        })
};

exports.delete = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id)
        .then(response => {
            res.status(200).send({
                message: 'Product removed successfuly.'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Failed to remove the product.',
                data: err
            });
        })
};
