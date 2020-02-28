'use strict'

const guid = require('guid');
const repository = require('../repositories/OrderRepository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: 'Failed to process the request.',
            data: err,
        });
    }
};

exports.post = async (req, res, next) => {
    try {
        await repository.store({
            number: guid.raw().substring(0, 6),
            customer: req.body.customer,
            items: req.body.items,
        });
        
        res.status(201).send({
            message: 'Order created succesfuly.',
        })
    } catch (err) {
        res.status(500).send({
            message: 'Failed to process the request.',
            data: err,
        });
    }   
};