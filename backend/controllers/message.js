const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

exports.allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat");
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.status(400).json({
        success: false,
        message: "Invalid Data ID",
      });
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name avatar")
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "name avatar email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.status(201).json({
        success: true,
        message
      });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
