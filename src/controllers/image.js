const misc = require('./misc');
const path = require('path');
const multer = require('multer');
const ImageCompanies = './src/images/companies/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ImageCompanies);
  },
  filename: (req, file, cb) => {
    const fileName = path.basename(file.originalname);
    const extension = path.extname(file.originalname);
    const files = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const imageName =
      files + '-' + Date.now() + path.extname(file.originalname);
    const image = imageName
      .toLowerCase()
      .split(' ')
      .join('-');
    cb(null, image);
  },
});
const upload = multer({
  storage: storage,
  limit: {
    fileSize: (req, file, cb) => {
      if (file.fileSize >= 1 * 1024 * 1024) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('file cannot more than 1MB'));
      }
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/gif'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('allowed only .png, .jpg, .jpeg and.gif'));
      }
    },
  },
});

module.exports = {
  upload: multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/gif'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('allowed only .png, .jpg, .jpeg and.gif'));
      }
    },
  }),
};
