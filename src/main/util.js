'use strict';
var request = require('request');

module.exports = {
  requestPromise(options) {
    return new Promise((resolve, reject) =>{
      request(options, (err, res, body) => err ? reject(err) : resolve(body));
    });
  }
};
