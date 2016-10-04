module.exports = function () {
  var request = require('request');
  var config = require('../config/config')();

  var service = {
    getStocks: getStocks
  };
  return service;

  function getStocks(symbols, done) {
    var options = getConfig(symbols);

    request.get(options, function (err, res, body) {
      if (err) {
        done(err, null);
      }
      done(null, body);
    });
  }

  function getConfig(query) {
    return {
      uri: config.HOST + config.PATH + '&text=' + query,
      method: 'GET',
      headers: {
        'X-Mashape-Key': config.HEADER_MASHAPE_KEY,
        'Accept': config.HEADER_ACCEPT_KEY
      }
    };
  }
};
