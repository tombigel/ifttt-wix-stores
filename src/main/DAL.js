'use strict';
const FireBase = require('firebase');
let ref;
let instances;

function promiseValues(instance) {
  return new Promise(function (resolve) {
    instances.child(instance).once('value', function (data) {
      console.log(`requested data for instance ${instance} with data ${JSON.parse(data)}`);
      resolve(data.val());
    });
  });
}

function init(firebaseApp) {
  ref = new FireBase(`https://${firebaseApp}.firebaseio.com/`);
  instances = ref.child('instances');
}

module.exports = {
  init,
  getProducts: instance => promiseValues(instance),
  setProducts: (instance, value) => instances.child(instance).set(value)
};
