'use strict';

const DAL = require('./DAL');
const STATIC_MEDIA_URL = 'http://static.wixstatic.com/media/';
const _ = require('lodash');
const wixStores = require('./wixStoresFacade');

function getNewProducts(instance) {
  let pastProducts = DAL.getProducts(instance);
  return wixStores.pollProducts(instance)
    .then(function (data) {
      let products = data.products.map(function (product) {
        return {
          product_id: product.id,
          product_name: product.name,
          product_image: _.get(product, 'media[0].url') ? STATIC_MEDIA_URL + product.media[0].url : undefined
        };
      });
      DAL.setProducts(instance, products);
      return pastProducts ? _.reject(products, product => _.some(pastProducts, 'id', product.id)) : [];
    });
}

module.exports = {
  getNewProducts
};
