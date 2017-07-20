var formidable = require('formidable');
var config = require('../../config/config');

module.exports = function (req, res, next) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.path = config.root + '/temp/' + file.name;
  });

  form.on('file', function (name, file) {
    req.file = {
      path: config.root + '/temp/' + file.name
    }
    next();
  });
}
