var express = require('express'),
  router = express.Router(),
  formidable = require('../middlewares/formidable'),
  extractReceiptTotal = require('../middlewares/extract-receipt-total');
  saveReceipt = require('../middlewares/save-receipt');
  clearFile = require('../middlewares/clear-file');
  getReceipts = require('../middlewares/get-receipts');
  deleteReceipt = require('../middlewares/delete-receipt');
  updateReceipt = require('../middlewares/update-receipt');
  mongoose = require('mongoose');
  Receipt = mongoose.model('Receipt');

module.exports = function (app, config) {
  app.use('/api', router);

  router.route('/receipts')
    .get(getReceipts)
    .post(saveReceipt)
    .delete(deleteReceipt)
    .put(updateReceipt);

  router.route('/receipts/scan').post(formidable, extractReceiptTotal, saveReceipt, clearFile)

  router.route('/addReceipts').get(function (req, res, next) {
    let type = req.query.type;
    for(let i = 0; i <= 5 ; i++){
      let receipt = new Receipt({
        total: i * 10,
        type: type
      })

      receipt.save();
    }
  })
};
