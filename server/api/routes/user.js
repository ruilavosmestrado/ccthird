const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/all", checkAuth, UserController.get_all_users);
router.post("/searchUser", checkAuth, UserController.search_user);
router.post("/myFriends", checkAuth, UserController.my_friends);
router.post("/friendRequests", checkAuth, UserController.friend_requests);

module.exports = router;
