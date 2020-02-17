'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/ProductRepository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data);
    } catch (err) {
        sendErrorMessage(err)
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (err) {
        sendErrorMessage(data)
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data  = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        sendErrorMessage(err)
    }
}; 

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(err) {
        sendErrorMessage(err)
    }
}; 

exports.post = async (req, res, next) => {
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

    try {
        await repository.store({ title, slug, description, price });
    
        res.status(201).send({
            message: 'Product successfully registered.'
        });
    } catch(err) {
        sendErrorMessage(err)
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        
        res.status(200).send({
            message: 'Product updated successfully.'
        });
    } catch (err) {
        sendErrorMessage(err)
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.destroy(req.body.id)
        
        res.status(200).send({
            message: 'Product removed successfuly.'
        });
    } catch (err) {
        sendErrorMessage(err) 
    }
};

function sendErrorMessage(data) {
    res.status(500).send({
        message: 'Failed to process request.',
        data,
    });
}
