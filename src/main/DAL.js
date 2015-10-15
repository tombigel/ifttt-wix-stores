'use strict';
const Firebase = require('firebase');
const _ = require('lodash');
let ref;
let instances;


function init(firebaseApp) {
  ref = new Firebase(`https://${firebaseApp}.firebaseio.com/`);
  instances = ref.child('instances');
}

function getStoreId(instanceId) {
  return new Promise(function (resolve) {
    ref.child('stores').once('value', function (data) {
      resolve(_.findKey(data.val(), (store) => store === instanceId));
    });
  });
}

function getProducts(storeId) {
  return new Promise(function (resolve) {
    instances.child(storeId).once('value', function (data) {
      resolve(data.val());
    });
  });
}

function setStore(instanceId) {
  ref.child('stores').push(instanceId);
}

module.exports = {
  init,
  getStoreId,
  setStore,
  getProducts,
  setProducts: (instance, value) => instances.child(instance).set(value)
};
