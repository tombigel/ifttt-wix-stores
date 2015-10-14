const express = require('express');
const config = require('./config');

const app = express();


app.get('/', (req, res) => res.status(200).send('OK'));
app.get('/ifttt/v1/status', (req, res) => res.status(200).end());

var server = app.listen(config.port, () => {
    console.log('Now listening to http://%s:%s,', server.address().address, server.address().port);
});
