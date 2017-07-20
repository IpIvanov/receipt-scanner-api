var express = require('express'),
  router = express.Router(),
  formidable = require('../middlewares/formidable'),
  processImage = require('../middlewares/process-image'),
  extractReceiptTotal = require('../middlewares/extract-receipt-total'),
  postReceipt = require('../middlewares/post-receipt'),
  clearFile = require('../middlewares/clear-file'),
  getReceipts = require('../middlewares/get-receipts'),
  deleteReceipt = require('../middlewares/delete-receipt'),
  putReceipt = require('../middlewares/put-receipt'),
  sendResult = require('../middlewares/send-result'),
  mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipt');

module.exports = function (app, config) {
  app.use('/api', router);

  router.route('/receipts')
    .get(getReceipts)
    .post(postReceipt)
    .delete(deleteReceipt)
    .put(putReceipt);

  router.route('/receipts/scan')
    .post(formidable, processImage, extractReceiptTotal, clearFile)

  router.route('/addReceipts').get(function (req, res, next) {
    let type = req.query.type;
    for (let i = 0; i <= 5; i++) {
      let receipt = new Receipt({
        total: i * 10,
        type: type
      })

      receipt.save();
    }
  })
};
