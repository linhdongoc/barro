const PORT = 4001;
const HOST = '127.0.0.1';

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json()); // to support JSON-encoded bodies

/*
* http://127.0.0.1:4001/list-data
* {"data":[null,null,null,null,null]}
*
* http://127.0.0.1:4001/list-data?page=0
* {"nextIndex":1,"data":[1,2,3,4,5]}
* */
let value = 6;
app.get('/list-data', function(req, res) {
  console.log('Page: ', req.query.page);

  let nextIndex;
  let pageIndex = +req.query.page;

  value = pageIndex * 5 + 1;

  if (req.query.page < 3) {
    nextIndex = pageIndex + 1;
    res.status(200).send({
      nextIndex,
      data: [value++, value++, value++, value++, value++]
    });
  } else {
    res.status(200).send({
      data: [value++, value++, value++, value++, value++]
    });
  }
});

/*
* http://127.0.0.1:4001/list-retry-data
* {"message":"Page not found!"}
* {"success":true,"data":"Some data from BE"}
* */
let count = 0;
app.get('/list-retry-data', function(req, res) {
  console.log('count: ', count);

  if (count++ < 3) {
    res.status(404).send({
      message: 'Page not found!'
    });
    return;
  }

  count = 0;
  res.status(200).send({
    success: true,
    data: 'Some data from BE'
  });
});

/*
* http://127.0.0.1:4001/list-retrywhen-data
* {"success":true,"data":[1,2]}
* {"success":true,"data":[1,2,3]} ...
* */
let counter = 3;
let data = [1,2];
app.get('/list-retrywhen-data', function(req, res) {

  data = data.concat([counter++]);
  if (data.length > 10) { data = [1,2]; counter = 3;};

  res.status(200).send({
    success: true,
    data: data
  });

});

app.listen(PORT, function() {
  console.log('Mock back-end is listening on port ' + PORT + '...');
});
