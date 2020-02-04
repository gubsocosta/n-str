'use strict'

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;

    res.status(200).send({
        id,
        body: req.body,
    });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    res.status(200).send({
        id,
        body: req.body,
    });
});

module.exports = router;