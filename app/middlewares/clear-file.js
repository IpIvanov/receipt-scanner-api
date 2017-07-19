const fs = require('fs')

module.exports = function (req, res, next) {
  // fs.unlink(req.file.path, function(error) {
  //   if (error) {
  //     res.status(500).end();
  //   }
    res.end();
  // })
}
