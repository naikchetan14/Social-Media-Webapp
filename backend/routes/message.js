const express=require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { allMessages, sendMessage } = require("../controllers/message");


router.route("/allmessages/:chatId").get(isAuthenticated, allMessages);
router.route("/sendmessage").post(isAuthenticated, sendMessage);

module.exports=router;

