// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  total: String,
  date: Date
});

ReceiptSchema.virtual('id')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Receipt', ReceiptSchema);

