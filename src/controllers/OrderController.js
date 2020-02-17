'use strict'

const guid = require('guid');
const repository = require('../repositories/OrderRepository');

exports.post = async(req, res, next) => {
    try {
        await repository.post({
            number: guid.raw().substring(0, 6),
            customerId: req.body.customerId,
            items: req.body.items,
        });
        
        res.status(201).send({
            message: 'Order created succesfuly',
        })
    } catch (err) {
        res.status(500).send({
            message: 'Falied to process the request.',
            //data: err,
        });
    }   
};