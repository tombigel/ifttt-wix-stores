'use strict';

const DAL = require('./DAL');
DAL.init(require('./config').firebaseApp);
const STATIC_MEDIA_URL = 'http://static.wixstatic.com/media/';
const _ = require('lodash');
const wixStores = require('./wixStoresFacade');

function getProductInfo(product) {
  return {
    id: product.id,
    product_name: product.name,
    product_image: _.get(product, 'media[0].url') ? STATIC_MEDIA_URL + product.media[0].url : undefined
  };
}

function getProductsWithNewIds(current, polled) {
  return current ? _.reject(polled, product => _.some(current, {id: product.id})) : [];
}

function getNewProducts(instanceId) {
  return DAL.getStoreId(instanceId)
    .then(function (storeId) {
      if (storeId) {
        return Promise.all([DAL.getProducts(storeId), wixStores.pollProducts(instanceId)])
          .then(function (data) {
            const products = data[1].products.map(getProductInfo);
            DAL.setProducts(storeId, products);
            return getProductsWithNewIds(data[0], products);
          }, (err) => console.log(err));

      }
      DAL.setStore(instanceId);
      return [];
    });
}

module.exports = {
  getNewProducts
};
