const express = require("express");
const router = express.Router();
const multer = require('multer')
const multerS3 = require('multer-s3')
const MessageController = require('../controllers/messages');
const checkAuth = require('../middleware/check-auth');
const config = require('../../config/DB');
const AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});
const s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ccthird',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.get("/", checkAuth, MessageController.get_messages);
router.post("/create", checkAuth, upload.single('img'), MessageController.create_message);

module.exports = router;
