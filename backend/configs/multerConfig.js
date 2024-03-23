const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() === '.png') {
      cb(null, Date.now() + '.png');
    } else {
      const error = new Error('Only PNG files are allowed');
      error.code = 'FILE_TYPE_NOT_SUPPORTED';
      cb(error);
    }
  }
});

const upload = multer({ storage: storage });

module.exports = { upload };
