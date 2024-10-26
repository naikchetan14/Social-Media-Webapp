const express=require("express");
const { isAuthenticated } = require("../middlewares/auth");

const { register, login, logout, followUser, updatePassword, updateProfile, getAllUsers, myProfile, getUserProfile, getMyPosts, getUserPosts } = require("../controllers/user.js");

const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);


router.route("/follow/:id").get(isAuthenticated,followUser);

router.route("/update/password").post(isAuthenticated,updatePassword);
router.route("/update/profile").post(isAuthenticated,updateProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/all/users").get(isAuthenticated,getAllUsers);

router.route("/user/:id").get(isAuthenticated,getUserProfile);
router.route("/my/posts").get(isAuthenticated,getMyPosts);
router.route("/userposts/:id").get(isAuthenticated,getUserPosts);


module.exports = router;