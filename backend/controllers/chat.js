const Chat = require("../models/Chat");
const User = require("../models/User");
exports.accessChat = async (req, res) => {

  const { userId } =req.body;

  if (userId?.toString() === req?.user?._id.toString()) {
    return res.status(400).json({
      success: false,
      messsage: "You cannot chat with yourself",
    });
  }
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400).json({
      success: false,
      messsage: "UserId param not sent with request",
    });
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  if (isChat.length > 0) {
    res.status(200).json({
      success: true,
      chats:isChat[0]
    });
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json({
        success: true,
        chats: FullChat,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name avatar email",
        });
        res.status(200).json({
          success: true,
          chats:results,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
