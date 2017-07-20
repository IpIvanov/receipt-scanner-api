var mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt');


module.exports = function (req, res, next) {
  if (req.query.total || req.query.type) {
    var receipt = new Receipt({
      total: req.query.total,
      type: req.query.type
    });
  } else {
    var receipt = new Receipt({
      total: req.receiptTotal
    });
  }

  receipt.save(function (error, receipt) {
    if (error) {
      res.status(500).end(error);
    }
    res.json(receipt);
    next();
  });
}
