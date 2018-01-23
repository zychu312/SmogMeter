const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const initDatabase = require('./Database/Init').init;
const root = path.join(path.dirname(__dirname), 'Frontend');
const morgan = require('morgan');

const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const scalePm25 = 0.191869918699187;
const scalePm10 = 0.21621621621;

wss.broadcast = data => wss.clients
    .forEach(client => client.readyState === WebSocket.OPEN ? client.send(data) : null);

const init = async () => {

    const { recordsRepository } = await initDatabase();

    const controllers = [
        require('./Controllers/Records').init(recordsRepository),
    ];

    port.on('error', err => console.log('Error: ', err.message));

    port.on('data', data => {

        const measurement = {
            'pm25': data.readUInt16LE(2) * scalePm25,
            'pm10': data.readUInt16LE(4) * scalePm10,
            'date': new Date()
        };

        wss.broadcast(JSON.stringify(measurement));

        recordsRepository.saveRecord(measurement);
    });

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
        .listen(80);
};

init().catch(err => console.log(`Error during initialization ${err}`));