var mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt');


module.exports = function (req, res, next) {
  var receipt = new Receipt({
    total: req.receiptTotal
  })

  receipt.save(function (error, receipt) {
    if (error) {
      res.status(500).end(error);
    }
    res.send(receipt.toString());
    next();
  });
}
