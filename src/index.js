'use strict'

const express = require('express');
const http = require('http');
const debug = require('debug')('nodestr:server');

const app = express();
const PORT = 3000;

app.set('port', PORT);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.1'
    });
});

app.use('/', route);

server.listen(PORT);
console.log('API running in port ' + 3000);
