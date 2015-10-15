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
    res.status(401).send({errors: [{message: 'Unknown Source'}]});
  }
}

function getInstanceId(req){
  return _.get(req, 'body.triggerFields.instance_id');
}

function limitResults(limit, results){
    return  _.isUndefined(limit) ? results : _.takeRight(results, limit);
}

function handleNewProductPolling(req, res) {
  const instanceId = getInstanceId(req);
  const limit = _.get(req, 'body.limit');
  if (instanceId) {
    wixStores.getProducts(instanceId)
      .then(function(newProducts) {
        res.status(200).json({data: limitResults(limit, newProducts)});
      }, (err) => res.status(500).json(err));
  } else {
    res.status(400).json({errors: [{message:'missing store_id'}]});
  }
}

function handleNewOrderPolling(req, res){
  const instanceId = getInstanceId(req);
  const limit = _.get(req, 'body.limit');
  if (instanceId) {
    wixStores.getOrders(instanceId)
      .then(function(newOrders){
          res.status(200).json({data: limitResults(limit, newOrders)});
      }, (err) => res.status(500).json(err));
  } else {
    res.status(400).json({errors: [{message:'missing store_id'}]});
  }
}

app.get('/', (req, res) => res.status(200).json(config.HEROKU_RELEASE_VERSION));
app.get(`${BASE_URL}/status`, verifyIfttt, (req, res) => res.status(200).end());
app.post(`${BASE_URL}/triggers/new_product_added`, verifyIfttt, handleNewProductPolling);
app.post(`${BASE_URL}/triggers/new_order`, verifyIfttt, handleNewOrderPolling);

app.post(`${BASE_URL}/test/setup`, verifyIfttt, (req, res) => res.status(200).json(testData));

app.listen(config.port);
