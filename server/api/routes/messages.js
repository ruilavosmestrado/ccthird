const express = require("express");
const router = express.Router();
const MessageController = require('../controllers/messages');
const checkAuth = require('../middleware/check-auth');
const config = require('../../config/DB');
const AWS = require("aws-sdk");
AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});

router.get("/", checkAuth, MessageController.get_messages);
router.post("/create", checkAuth, upload.single('img'), MessageController.create_message);

module.exports = router;
