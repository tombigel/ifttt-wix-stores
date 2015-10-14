'use strict';

var DAL = require('./DAL');
var _ = require('lodash');


function getNewProducts(instance) {
  let pastProducts = DAL.getProducts(instance);
  return DAL.pollProducts(instance)
  .then(currentProducts => _.difference(currentProducts, pastProducts));
}

module.exports = {
  getNewProducts
};
