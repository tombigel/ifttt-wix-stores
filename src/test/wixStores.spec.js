'use strict';

describe('new Products', function () {
  const DAL = require('../main/DAL');
  const wixStores = require('../main/wixStoresFacade');
  beforeEach(()=> {
    spyOn(wixStores, 'pollProducts').and.callFake(()=> Promise.resolve([{id: 1}, {id: 2}, {id: 3}]));
    spyOn(DAL, 'getProducts').and.callFake(()=> Promise.resolve([{product_id: 1}, {product_id: 2}]));
    spyOn(DAL, 'init');
  });
  it('should return a promise for the difference', (done) => {
    let wixStoresApi = require('../main/wixStores');
    wixStoresApi.getNewProducts('')
      .then(function (res) {
        expect(res).toEqual([3]);
        done();
      }, () => done(false));
  });
});
