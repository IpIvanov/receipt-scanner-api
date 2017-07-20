var Jimp = require("jimp");

module.exports = function (req, res, next) {
  Jimp.read(req.file.path, function (err, image) {
    if (err) {
      res.status(500).end();
    }

    image
      .rotate(90)
      .grayscale()
      .invert()
      .normalize()
      .scaleToFit(1200, 1200)
      .write(req.file.path);

    next();
  });
}
