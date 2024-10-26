const express=require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { createPost, likeandUnlikePost, updateCaption, addCommentToPost, getPostOfFollowing } = require("../controllers/post");

const router = express.Router();


router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/post/:id").get(isAuthenticated,likeandUnlikePost).put(isAuthenticated,updateCaption)
router.route("/post/comment/:id").put(isAuthenticated,addCommentToPost);

module.exports = router;