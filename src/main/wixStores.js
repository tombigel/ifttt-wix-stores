'use strict';

const DAL = require('./DAL');
const STATIC_MEDIA_URL = 'http://static.wixstatic.com/media/';
const _ = require('lodash');
const wixStores = require('./wixStoresFacade');

DAL.init(require('./config').firebaseApp);

function getProductInfo(product) {
  return {
    meta: {id: product.id, timestamp: Date.now()},
    product_name: product.name,
    product_image: _.get(product, 'media[0].url') ? STATIC_MEDIA_URL + product.media[0].url : undefined
  };
}

function getOrderInfo(order) {
  return {
    meta: {id: order.id, timestamp: order.createdDate},
    buyer_name: order.userInfo.name,
    created_date: new Date(+order.createdDate).toISOString(),
    total: `${order.totals.total} ${order.currency}`
  };
}

function getNewProducts(productsData, currProducts) {
  const newProductData = _.reject(productsData, function (product) {
    return _.some(currProducts, (currProd) => currProd.meta.id === product.id);
  });
  return newProductData.map(getProductInfo);
}

function getItemsSince(items, since) {
  return _.sortBy(items.filter(item => item.meta.timestamp > since), item => -item.meta.timestamp);
}

function getProducts(instanceId) {
  return Promise.all([DAL.getStoreMetaData(instanceId), wixStores.pollProducts(instanceId)])
    .then(function (data) {
      const storeMetaData = data[0];
      const productsData = data[1].products;

      if (_.isUndefined(storeMetaData)) {
        const storeId = DAL.getNextStoreId();
        DAL.setProducts(storeId, productsData.map(getProductInfo));
        DAL.setStore(storeId, instanceId);
        return [];
      }
      return DAL.getProducts(storeMetaData.storeId)
        .then(function (currProducts) {
          const newProducts = getNewProducts(productsData, currProducts);
          const allProducts = currProducts.concat(newProducts);
          DAL.setProducts(storeMetaData.storeId, allProducts);
          return getItemsSince(allProducts, storeMetaData.timestamp);
        });
    });
}

function getOrders(instanceId){
  return Promise.all([DAL.getStoreMetaData(instanceId), wixStores.pollOrders(instanceId)])
  .then(function(data) {
        const storeMetaData = data[0];

        if (_.isUndefined(storeMetaData)) {
          const storeId = DAL.getNextStoreId();
          DAL.setStore(storeId, instanceId);
          return [];
        }
        const orders = data[1].map(getOrderInfo);
        return getItemsSince(orders, storeMetaData.timestamp);
      });

}

module.exports = {
  getProducts,
  getOrders
};
