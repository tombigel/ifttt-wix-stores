const express = require('express');
const config = require('./config');
const app = express();

function verifyIfttt(req, res, next) {
    var channelKey = req.get('IFTTT-Channel-Key');
    if (channelKey && channelKey === config.channelKey) {
        next();
    } else {
        res.status(401).send('Unknown Source');
    }
}

function postTestSetup(req, res) {
    res.status(200).json({data: {samples: {}}});
}

app.get('/', (req, res) => res.status(200).send('OK'));
app.get('/ifttt/v1/status', verifyIfttt, (req, res) => res.status(200).end());
app.post('/ifttt/v1/test/setup', verifyIfttt, postTestSetup);

app.listen(config.port);

//var server = app.listen(config.port, () => {
//    console.log('Now listening to http://%s:%s,', server.address().address, server.address().port);
//});
