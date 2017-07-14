var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt');

module.exports = function (app) {
  app.get('/', router);

  app.get('/receipt', function (req, res, next) {
    res.end('success');
  });

  app.post('/receipt', function (req, res, next) {
    res.end('success');
  });
};

