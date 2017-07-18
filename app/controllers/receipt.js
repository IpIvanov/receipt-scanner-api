var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt'),
  tesseract = require('node-tesseract');


module.exports = function (app) {
  app.get('/', router);

  app.get('/receipt', function (req, res, next) {
    var options = {
      l: 'eng',
    };
    tesseract.process(__dirname + '/pictures/image.jpg', options, function (err, text) {
      if (err) {
        console.error(err);
      } else {
        extractTotalPrice(text)
      }
    });

    function extractTotalPrice(text) {
      var priceRegex = /\d{1,}[.|,]\d{2}/g;
      var prices = [];
      var matches;
      var max;

      while (matches = priceRegex.exec(text)) {
        prices.push(matches[0]);
      }
      max = Math.max.apply(null, prices);

      var receipt = new Receipt({
        total: max,
        date: new Date()
      })

      receipt.save(function(error, receipt) {
        if (error) {
          res.end(error);
        }
        res.end(receipt.toString()) ;
      })
    }
  });

  app.post('/receipt', function (req, res, next) {
  });
};

