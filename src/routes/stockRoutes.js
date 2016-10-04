/*jshint node:true*/
'use strict';

module.exports = function (app) {
  var stocksService = require('../service/stocksService')();

  app.get('/api/stocks/:symbols', getStocks);

  function getStocks(req, res, next) {
    stocksService.getStocks(req.params.symbols, function (error, stocks) {
      if (error) {
        return next(error);
      }
      res.send(stocks);
    });
  }
};
