var mongoose = require('mongoose'),
Receipt = mongoose.model('Receipt');

module.exports = function (req, res, next) {
  if (req.query.id) {
    let receiptId = req.query.id;
    Receipt.findById(receiptId, function (err, receipt){
      if(receipt) {
        res.send(receipt);
      } else {
        res.json({error: 'No receipt found'})
      }
      next();
    });
  }
  else {
    Receipt.find({}, function(err, receipts) {
      res.send(receipts);
      next();
    });
  }
}
