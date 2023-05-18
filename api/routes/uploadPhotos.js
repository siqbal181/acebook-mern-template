const express = require("express");
const router = express.Router();

const UploadPhotosController = require('../controllers/uploadPhotos');

router.post("/", UploadPhotosController.UploadPhotos);

module.exports = router;