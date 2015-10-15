'use strict';
const Firebase = require('firebase');
const _ = require('lodash');
let ref;
let instances;


function init(firebaseApp) {
  ref = new Firebase(`https://${firebaseApp}.firebaseio.com/`);
  instances = ref.child('instances');
}

function getStoreMetaData(instanceId) {
  return new Promise(function (resolve) {
    ref.child('stores').once('value', function (data) {
      const stores = data.val();
      const storeId = _.findKey(stores, {instanceId});
      resolve(storeId && {storeId, timestamp: stores[storeId].timestamp});
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

function setStore(storeId, instanceId) {
  ref.child('stores').child(storeId).set({
    instanceId: instanceId, timestamp: Date.now()
  });
}

function getNextStoreId() {
  return ref.child('stores').push().key();
}

module.exports = {
  init,
  getStoreMetaData,
  setStore,
  getProducts,
  getNextStoreId,
  setProducts: (storeId, value) => instances.child(storeId).update(value)
};
