var config = require('../../config/config'),
  tesseract = require('node-tesseract');

  //var Tesseract = require('tesseract.js');


module.exports = function (req, res, next) {

  // Tesseract.recognize(req.file.path)
  //        .progress(function  (p) {
  //          console.log('progress', p)
  //         })
  //        .then(function (result) {
  //          req.receiptTotal = result;
  //          res.json(result);
  //         })
  var options = {
    l: 'eng'
  };
  tesseract.process(req.file.path, options, function (error, text) {
    console.log(text);
    if (error) {
      res.status(500).end(error);
    }
    var priceRegex = /\d{1,}[.|,]\d{2}/g;
    var prices = [];
    var matches;
    var max;

    while (matches = priceRegex.exec(text)) {
      prices.push(parseFloat(matches[0]));
    }
    console.log(prices);
    req.receiptTotal = Math.max.apply(null, prices);


  });
}
