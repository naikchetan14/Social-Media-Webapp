const Post = require("../models/Post.js");

exports.getPost = async (id) => {
  try {
    return await Post.findById(id);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (id) => {
  try {
    return await Post.deleteOne(id);
  } catch (error) {
    console.log(error);
  }
};
