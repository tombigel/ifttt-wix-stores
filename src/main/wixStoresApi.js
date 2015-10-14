'use strict';


var request = require('request');
var DAL = require('./DAL');
var _ = require('lodash');


function getNewProducts(instance) {
  let pastProducts = DAL.getProducts(instance);
  DAL.getCurrentProducts(instance)
  .then(currentProducts => _.difference(currentProducts, pastProducts));
}

module.exports = {

}
