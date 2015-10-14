const INSTANCE = "GtygEmHBxrV7Q_vnooMFi3TSYZ4xrmoBCoNeZinKcNA.eyJpbnN0YW5jZUlkIjoiMTQwY2ZmYjctMDczNy1hNDE4LWNiYjYtNzlhZmIyMGM0NDY2Iiwic2lnbkRhdGUiOiIyMDE1LTEwLTE0VDExOjA0OjI0LjI3OVoiLCJ1aWQiOiIyYTZlZTVhZS00YzFiLTQ2ZTgtYTUyMi1kNjAxOTE5NjA1ZDMiLCJwZXJtaXNzaW9ucyI6Ik9XTkVSIiwiaXBBbmRQb3J0IjoiOTEuMTk5LjExOS4yNTQvNDAwMzgiLCJ2ZW5kb3JQcm9kdWN0SWQiOm51bGwsImRlbW9Nb2RlIjpmYWxzZSwib3JpZ2luSW5zdGFuY2VJZCI6IjE0MDhiMDc1LTE0MzEtNzRmYS0zMTBhLWViNDk0M2UwNGQwOCIsImFpZCI6IjBkOGY3MmMzLWU5ZjMtNDkyOC1iZTcxLTk1N2Q5ODc1MTZiZSIsImJpVG9rZW4iOiI3NDg4NWZmYS0yYjFlLWU3MDgtNjU4Yy1lNDIwYTQzMTBiNWIiLCJzaXRlT3duZXJJZCI6IjJhNmVlNWFlLTRjMWItNDZlOC1hNTIyLWQ2MDE5MTk2MDVkMyJ9";

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
