'use strict';
const PREFIX = 'http://ecom.wix.com/_api/wix-ecommerce-renderer-web/store-front';
const ALL_PRODUCTS_CATEGORY = '00000000-000000-000000-000000000001';

var productsPerStore = new Map();

function requestByInstance(url, instance) {
  return new Promise(function (resolve, reject) {
    require('request').get({
      url: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-ecom-instance': instance
      }
    }, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

module.exports = {
  pollProducts(instance) {
    return requestByInstance(`${PREFIX}/get-category-items?categoryId=${ALL_PRODUCTS_CATEGORY}`, instance)
      .then(JSON.parse)
    .then(data => productsPerStore.set(instance, data.products.map(p => p.id)));
  },
  getProducts: instance => productsPerStore.get(instance)
};
