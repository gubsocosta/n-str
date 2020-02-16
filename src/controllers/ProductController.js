'use strict'

const Product = require('../models/Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/ProductRepository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(400).send({
                message: 'Failed to get records',
                data: err
            })
        })
};

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
};

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
}; 

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(404).send({
                message: 'Record not found',
                data: err
            })
        })
}; 

exports.post = (req, res, next) => {
    const { title, slug, description, price } = req.body;
    let contract =  new ValidationContract();

    contract.isRequired(title, 'The title field is required.');
    contract.hasMinLen(title, 3, 'The title field must contain at least three characters');
    
    contract.isRequired(slug, 'The slug field is required.');
    contract.hasMinLen(slug, 3, 'The slug field must contain at least three characters');
    
    contract.isRequired(description, 'The description field is required.');
    contract.hasMinLen(description, 3, 'The description field must contain at least three characters');
    
    contract.isRequired(price, 'The price field is required.')
    contract.isNumber(price, 'The price field must be a number.');
    contract.isGreaterThan(price, 0, 'The price field must be gran than zero.');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .store({ title, slug, description, price })
        .then(response => {
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
    repository
        .update(req.params.id, req.body)
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
    repository
        .destroy(req.body.id)
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
