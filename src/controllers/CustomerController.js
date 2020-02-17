'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/CustomerRepository');

exports.post = async (req, res, next) => {
    const { name, email, password } = req.body;
    let contract = new ValidationContract();

    contract.isRequired(name, 'The name field is required.');
    contract.hasMinLen(name, 3, 'The name field must contain at least three characters');
    
    contract.isRequired(email, 'The email field is required.');
    contract.isEmail(email, 'Enter a valid email address');
    
    contract.isRequired(password, 'The password field is required.');
    contract.hasMinLen(password, 8, 'The password field must contain at least three characters');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return
    }

    try {
        await repository.store(data);

        res.status(201).send({
            message: 'Customer created successfuly.'
        })
    } catch (err) {
        sendErrorMessage(err);
    }
};

function sendErrorMessage(data) {
    res.status(500).send({
        message: 'Failed to process request.',
        data,
    });
}