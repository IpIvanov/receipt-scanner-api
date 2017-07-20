var mongoose = require('mongoose'),
Receipt = mongoose.model('Receipt');

module.exports = function (req, res, next) {
  var data = req.body;
  var id = req.query.id;

  Receipt.findById(id, function (err, doc){
    if(doc) {
      doc.total = data.total;
      doc.type = data.type;
      doc.save(function(err){
        if (err) {
          res.json(err);
        }
        res.json({message: 'Receipt updated'});
      })
    } else {
      res.json({error: 'No receipt found'});
    }
  });
}
