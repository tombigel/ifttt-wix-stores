var express = require('express');
var config = require('./config');
var app = express();

app.get('/ifttt/v1/status', getStatus);

function getStatus(req, res){
    res.status(200).end();
}

var server = app.listen(config.port, function () {
    console.log('Now listening to http://%s:%s,', server.address().address, server.address().port);
});


//function requestPromise(url, instance) {
//  return new Promise(function (resolve, reject) {
//    request.get({
//      url: url,
//      headers: {
//        'Access-Control-Allow-Origin': '*',
//        'X-ecom-instance': instance
//      }
//    }, function (err, res, body) {
//      if (err) {
//        reject(err);
//      } else {
//        resolve(body)
//      }
//    });
//  })
//}
//
//
//var products;
//var categories;
//requestPromise(PREFIX + '/get-category-list', INSTANCE)
//  .then(JSON.parse)
//  .then(data => console.log(data))//categories = data.categories);
//
////console.log('Hello world!'); //eslint-disable-line
////setInterval(function(){
////  _.forEach(categories, function(cat) {
////    requestPromise(PREFIX + '/get-category-items?categoryId=' + cat.id, INSTANCE)
////    .then(JSON.parse)
////    .then(data => console.log(JSON.stringify(data, null, 2)))
////  })
////}, 1000 * 10);
