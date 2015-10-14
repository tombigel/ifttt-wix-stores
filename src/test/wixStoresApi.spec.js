'use strict';

describe('new Products', function () {
  const DAL = require('../main/DAL');
  const wixStores = require('../main/wixStores');
  beforeEach(()=> {
    spyOn(wixStores, 'pollProducts').and.callFake(()=> Promise.resolve([1, 2, 3]));
    spyOn(DAL, 'getProducts').and.callFake(()=> [1,2]);
  });
  it('should return a promise for the difference', (done) => {
    let wixStoresApi = require('../main/wixStoresApi');
    wixStoresApi.getNewProducts('')
      .then(function (res) {
        expect(res).toEqual([3]);
        done();
      }, () => done(false));
  });
});
