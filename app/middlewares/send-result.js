module.exports = function (req, res, next) {
  res.json({total: req.receiptTotal});
  next();
}
