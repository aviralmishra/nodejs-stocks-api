'use strict';

var request = require("supertest");
var app = require("../app").app;

describe('GET /', function () {
  it('responds HTTP 200', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /api/stocks/AAPL', function () {
  it('responds as JSON type with AAPL symbol', function (done) {
    request(app)
      .get('/api/stocks/AAPL')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function checkSymbol(res) {
        var requested = 'AAPL';
        var received = res.body[0].symbol;

        if (requested !== received) {
          throw new Error('Requested: ' + requested + ', ' + 'Received:' + received);
        }
      }).end(done);
  });
});
