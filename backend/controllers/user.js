const Post = require("../models/Post.js");
const User = require("../models/User");
const { deletePost, getPost } = require("../services/postServices.js");
const {
  getUserDetailByEmail,
  getSingleUser,
  deletUser,
  getAllUsers,
} = require("../services/userServices.js");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    console.log("name email password", name, email, password);
    let user = await getUserDetailByEmail(email);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await getUserDetailByEmail(email)
      .select("+password")
      .populate({
        path: "posts",
        populate: {
          path: "owner",
        },
      })
      .populate("followers following");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "Invalid credientials",
      });
    }

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const loggedinUser = await getSingleUser(req.user._id);
    const userToFollow = await getSingleUser(req.params.id);

    if (loggedinUser.following.includes(req.params.id)) {
      const indexFollowing = loggedinUser.following.indexOf(req.params.id);
      loggedinUser.following.splice(indexFollowing, 1);

      const indexFollower = userToFollow.followers.indexOf(loggedinUser._id);
      userToFollow.followers.splice(indexFollower, 1);
      await loggedinUser.save();
      await userToFollow.save();
      return res.status(200).json({
        succes: true,
        message: "unfollowed User",
      });
    } else {
      loggedinUser.following.push(req.params.id);
      userToFollow.followers.push(loggedinUser._id);
      await loggedinUser.save();
      await userToFollow.save();
      return res.status(200).json({
        succes: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    let user = await getSingleUser(req.user._id).select("+password");

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        sucess: false,
        message: "Please Enter All Details",
      });
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({
        sucess: false,
        message: "OldPassword and NewPassword Should Be Different",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid Credientials",
      });
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      sucess: true,
      message: "Pasword changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "posts",
        populate: {
          path: "owner",
        },
      })
      .populate("posts followers following");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//pending below Api
exports.deleteMyProfile = async (req, res) => {
  try {
    let user = await getSingleUser(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userID = user._id;

    await deletUser(req.user._id);
    //remove all Post
    for (let index = 0; index < posts.length; index++) {
      let post = await getPost(posts[index]);
      await post.remove();
    }

    //remove all followers
    for (let index = 0; index < followers.length; index++) {
      let followers = await getSingleUser(followers[index]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    //remove all following
    for (let index = 0; index < following.length; index++) {
      let following = await getSingleUser(following[index]);
      const index = following.followers.indexOf(userId);
      following.followers.splice(index, 1);
      await following.save();
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "posts",
        populate: [{ path: "owner" }, { path: "likes" }],
      })
      .populate("followers following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await getSingleUser(req.user._id);
    const posts = [];
    for (let index = 0; index < user.posts.length; index++) {
      const post = await Post.findById(user.posts[index]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
