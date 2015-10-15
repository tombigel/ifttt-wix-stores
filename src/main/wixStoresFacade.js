'use strict';
const PREFIX = 'http://ecom.wix.com/_api/wix-ecommerce-renderer-web/store-front';
const ALL_PRODUCTS_CATEGORY = '00000000-000000-000000-000000000001';
const util = require('./util');

function requestByInstance(url, instance) {
  return util.requestPromise({
    url,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-ecom-instance': instance
    }
  });
}

function pollProducts(instance) {
  return requestByInstance(`${PREFIX}/get-category-items?categoryId=${ALL_PRODUCTS_CATEGORY}`, instance)
      .then(JSON.parse);
}

function pollOrders(instance) {
  return requestByInstance(`${PREFIX}/orders`, instance)
      .then(JSON.parse)
      .then(data => data.payload.orders);
}

module.exports = {
  pollProducts,
  pollOrders
};
