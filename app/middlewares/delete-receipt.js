var mongoose = require('mongoose'),
Receipt = mongoose.model('Receipt');

module.exports = function (req, res, next) {
  Receipt.findOneAndRemove({ _id: req.query.id }, function (err, receipt){
    if(receipt) {
      res.json({success: 'Receipt deleted'});
    } else {
      res.json({error: 'No receipt found to delete'});
    }
    next();
  });
}
