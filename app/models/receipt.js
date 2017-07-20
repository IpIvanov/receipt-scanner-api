// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  total: { type: Number, default: 0},
  type: { type: String, default: 'Default' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Receipt', ReceiptSchema);
