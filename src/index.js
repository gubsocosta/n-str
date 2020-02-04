'use strict'

const express = require('express');
const http = require('http');
const debug = require('debug')('nodestr:server');

const app = express();
const PORT = normalizePort(process.env.PORT || '3000');

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
server.on('error', onError);
server.on('listening', onListening);

console.log('API running in port ' + 3000);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof PORT === 'string' ?
        'Pipe ' + PORT :
        'Port ' + PORT;
    
    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    
    debug('Listening on ' + bind);
}