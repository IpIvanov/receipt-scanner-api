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
      var priceRegex = /\d{1,}[.|,]\d{1,2}/;
      var priceRegexGlobal = /\d{1,}[.|,]\d{1,2}/g;
      var totalPriceRegex = /^.*total.*\d{1,}[.|,]\d{1,2}\D*/gi;
      var priceLineWithoutTotal = /^(?!.*total).*\d{1,}[.|,]\d{1,2}\s{1,}.*$/gi;
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

        while (matches = priceRegexGlobal.exec(result.text)) {
          prices.push(parseFloat(matches[0]));
        }
        totalPrice = Math.max.apply(null, prices);
      } else if (totalPrices.length >= 1) {
        var prices = totalPrices.map(function(element) {
          var matches = priceRegex.exec(element)
          console.log(matches);
          return parseFloat(matches[0].replace(/,/g, '.'));
        }); 
        console.log(prices);  

        totalPrice = Math.max.apply(null, prices);
      }
      console.log(allLines);
      console.log(itemLines);
      console.log(totalPrice);
      
      res.send({
        allLines: allLines,
        itemLines: itemLines,
        totalPrice: totalPrice
      });
    });
}
