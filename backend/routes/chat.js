const express=require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { fetchChats, accessChat } = require("../controllers/chat");


router.route("/fetchchats").get(isAuthenticated, fetchChats);
router.route("/accesschats").post(isAuthenticated, accessChat);


module.exports=router;
