var express = require('express'),
  router = express.Router(),
  formidable = require('../middlewares/formidable'),
  extractReceiptTotal = require('../middlewares/extract-receipt-total');
  saveReceipt = require('../middlewares/save-receipt');
  clearFile = require('../middlewares/clear-file');  
  

module.exports = function (app, config) {
  app.use('/api', router);

  router.route('/receipts')
    .get(function (req, res, next) {
    })

    .post(formidable, extractReceiptTotal, saveReceipt, clearFile);
};
