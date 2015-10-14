'use strict';

const DAL = require('./DAL');
const _ = require('lodash');
const wixStores = require('./wixStores');
function getNewProducts(instance) {
  let pastProducts = DAL.getProducts(instance);
  return wixStores.pollProducts(instance)
  .then(function(data) {
      let productIds = data.products.map(p => p.id);
      DAL.setProducts(instance, productIds);
      return _.difference(productIds, pastProducts);
    });
}

module.exports = {
  getNewProducts
};
