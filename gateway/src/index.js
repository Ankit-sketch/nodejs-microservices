const express = require('express');
const { PORT } = require('./config');
const cors = require('cors');
const proxy = require('express-http-proxy');


const StartServer = async () => {

    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '1mb' }));
    app.use('/customer', proxy('http://localhost:8001'));
    app.use('/products', proxy('http://localhost:8002'));
    app.use('/shopping', proxy('http://localhost:8003'));

    app.listen(PORT, () => {
        console.log(`API gateway is listening on port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();