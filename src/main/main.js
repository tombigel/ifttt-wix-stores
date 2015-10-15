'use strict';

const express = require('express');
const config = require('./config');
const wixStores = require('./wixStores');
const testData = require('./testData');
const _ = require('lodash');
const app = express();
const BASE_URL = '/ifttt/v1';

app.use(require('body-parser').json());

function verifyIfttt(req, res, next) {
  var channelKey = req.get('IFTTT-Channel-Key');
  if (channelKey && channelKey === config.channelKey) {
    next();
  } else {
    res.status(401).send('Unknown Source');
  }
}

function handleNewProductPolling(req, res) {
  var instanceId = _.get(req, 'body.triggerFields.instance_id');
  if (instanceId) {
    wixStores.getProducts(instanceId)
      .then(
      (newProducts) => res.status(200).json({data: newProducts}),
      (err) => res.status(500).json(err)
    );
  } else {
    res.status(400).json({errors: ['missing store_id']});
  }
}

app.get('/', (req, res) => res.status(200).json(config.HEROKU_RELEASE_VERSION));
app.get(`${BASE_URL}/status`, verifyIfttt, (req, res) => res.status(200).end());
app.post(`${BASE_URL}/triggers/new_product_added`, verifyIfttt, handleNewProductPolling);
app.post(`${BASE_URL}/test/setup`, verifyIfttt, (req, res) => res.status(200).json(testData));

app.listen(config.port);
