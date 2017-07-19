var config = require('../../config/config'),
  tesseract = require('node-tesseract');


module.exports = function (req, res, next) {
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

    next();
  });
}
