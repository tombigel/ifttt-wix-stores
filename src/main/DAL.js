'use strict';

const productsPerStore = new Map();

module.exports = {
  getProducts: instance => productsPerStore.get(instance),
  setProducts: (instance, value) => productsPerStore.set(instance, value)
};
