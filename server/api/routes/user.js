const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.delete("/:userId", checkAuth, UserController.user_delete);
router.get("/all", UserController.get_all_users);
router.post("/searchUser", UserController.search_user);
router.post("/myFriends", UserController.my_friends);
router.post("/friendRequests", UserController.friend_requests);

module.exports = router;
