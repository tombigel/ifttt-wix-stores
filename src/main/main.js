'use strict';

const express = require('express');
const config = require('./config');
const wixStores = require('./wixStores');
const testData = require('./testData');
const app = express();
const BASE_URL = '/ifttt/v1';

function verifyIfttt(req, res, next) {
    var channelKey = req.get('IFTTT-Channel-Key');
    if (channelKey && channelKey === config.channelKey) {
        next();
    } else {
        res.status(401).send('Unknown Source');
    }
}

function handleNewProductPolling(req, res) {
  wixStores.getNewProducts(req.body.triggerFields.store_id)
  .then((newProducts) => res.status(200).json({data: newProducts}));
}

app.get('/',                                                    (req, res) => res.status(200).send('OK'));
app.get(`${BASE_URL}/status`,                      verifyIfttt, (req, res) => res.status(200).end());
app.post(`${BASE_URL}/triggers/new_product_added`, verifyIfttt, handleNewProductPolling);
app.post(`${BASE_URL}/test/setup`,                 verifyIfttt, (req, res) => res.status(200).json(testData));

app.listen(config.port);

//var server = app.listen(config.port, () => {
//    console.log('Now listening to http://%s:%s,', server.address().address, server.address().port);
//});
