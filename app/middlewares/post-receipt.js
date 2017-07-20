var mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt');

module.exports = function (req, res) {
  var data = req.body;
  var receipt = new Receipt(data);

  receipt.save(function (error, receipt) {
    if (error) {
      res.status(500).end(error);
    }
    res.json({message : "Receipt created"});
  });
}
