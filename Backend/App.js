const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const initDatabase = require('./Database/Init').init;
const root = path.join(path.dirname(__dirname), 'Frontend');
const morgan = require('morgan');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = data => wss.clients
    .forEach(client => client.readyState === WebSocket.OPEN ? client.send(data) : null);


setInterval(() => wss.broadcast(JSON.stringify(Math.random())), 100);

const init = async () => {

    const { recordsRepository } = await initDatabase();

    const controllers = [
        require('./Controllers/Records').init(recordsRepository),
    ];

    app
        .use(bodyParser.json())
        .set('views', root)
        .set('view engine', 'hbs')
        .use(express.static(root))
        .use(require('./Middlewares/Error'))
        .use(morgan('tiny'))
        .use('/', controllers);

    server
        .on('error', err => console.log(err))
        .on('listening', () => console.log('Server listening ...'))
        .listen(3000);


};

init().catch(err => console.log(`Error during initialization ${err}`));