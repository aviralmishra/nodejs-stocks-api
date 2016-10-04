/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var routes;

var port = process.env.PORT || 4000;
var environment = process.env.NODE_ENV;

/* Setup middlewares. */
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(compress());
app.use(logger('dev'));
app.use(cors());

/* Views */
app.set('views', './src/views');
app.set('view engine', 'jade');

/* Add APIs to routes. */
routes = require('./src/routes/stockRoutes')(app);

/* On API errors, send JSON response with error message. */
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    errorMessage: err.message
  });
});

app.use('/api', function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
});

/* Root request. Show available paths. */
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  var paths = [];

  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      paths.push({
        link: r.route.path,
        text: r.route.path
      });
    }
  });

  res.render('index', {
    title: 'APIs',
    message: 'APIs are available.',
    APIs: paths
  });
});

/* Run server. */
console.log('Starting service...');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
