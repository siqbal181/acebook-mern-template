const multer = require('multer');
const Post = require("../models/post");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../frontend/public/images'); // specify the directory where uploaded files will be stored
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname.replace(/\s+/g, '-')); // use the original file name as the new file name
  }
});

const upload = multer({ storage: storage });

const UploadPhotosController = {
  UploadPhotos: (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      const file = req.file;
      return res.status(200).json({ message: 'File uploaded successfully', file: file });
    });
  }
};

module.exports = UploadPhotosController;