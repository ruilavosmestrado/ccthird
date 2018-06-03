const express = require("express");
const router = express.Router();

const MessageController = require('../controllers/messages');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, MessageController.get_messages);

module.exports = router;
