var mongoose = require('mongoose'),
Receipt = mongoose.model('Receipt');

module.exports = function (req, res, next) {
  let data = req.body;
  let receiptId = req.query.id;
  Receipt.findById(receiptId, function (err, doc){
    if(doc) {
      doc.total = data.total;
      doc.type = data.type;
      doc.save(function(err){
        if (err) {
          res.send(err);
        }
        res.json({message: 'Receipt updated'});
      })
    } else {
      res.json({error: 'No receipt found'});
    }
    next();
  });
}
