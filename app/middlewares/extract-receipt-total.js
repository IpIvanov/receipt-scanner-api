var config = require('../../config/config'),
  tesseract = require('node-tesseract');

var Tesseract = require('tesseract.js');


module.exports = function (req, res, next) {

  Tesseract.recognize(req.file.path, {
    lang: 'eng'
  })
    .progress(function (p) {
      console.log('progress', p)
    })
    .then(function (result) {
      var priceRegex = /\d{1,}[.|,]\d{2}/g;
      var totalPriceRegex = /^.*total.*\d{1,}[.|,]\d{2}/gi;
      var priceLineWithoutTotal = /^(?!.*total).*\d{1,}[.|,]\d{2}$/gi;
      var max;
      var allLines;
      var itemLines;
      var totalPrices;
      var totalPrice;

      allLines = result.lines.map(function (element) {
        return element.text.replace(/\n/g, '');
      });
      itemLines = allLines.filter(function (element) {
        return priceLineWithoutTotal.test(element);
      });
      totalPrices = allLines.filter(function (element) {
        return totalPriceRegex.test(element);
      });
      console.log(totalPrices);
      if (totalPrices.length === 0) {
        var matches;
        var prices = [];

        while (matches = priceRegex.exec(result.text)) {
          prices.push(parseFloat(matches[0]));
        }
        console.log(prices);
        totalPrice = Math.max.apply(null, prices);
      } else if (totalPrices.length >= 1) {
        var prices = totalPrices.map(function(element) {
          var matches = priceRegex.exec(element)
          return parseFloat(matches[0]);
        });
        console.log(prices);

        totalPrice = Math.max.apply(null, prices);
      }
      res.send({
        allLines: allLines,
        itemLines: itemLines,
        totalPrice: totalPrice
      });
    });
}
