// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  total: String,
  date: Date
});

mongoose.model('Receipt', ReceiptSchema);

