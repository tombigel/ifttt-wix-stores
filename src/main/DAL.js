'use strict';
const FireBase = require('firebase');
let ref;
let instances;

function promiseValues(instance) {
  return new Promise(function(resolve){
    ref.once(instance, (data) => resolve(data));
  });
}

function init(firebaseApp) {
  try {
    ref = new FireBase(`https://${firebaseApp}/.firebaseio.com/`);
    instances = ref.child('instances');
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = {
  init,
  getProducts: instance => promiseValues(instance),
  setProducts: (instance, value) => instances.child(instance).set(value)
};
