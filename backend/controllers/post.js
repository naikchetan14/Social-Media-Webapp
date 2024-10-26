const Post = require("../models/Post");
const { getPost } = require("../services/postServices");
const { getSingleUser } = require("../services/userServices");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
   const { caption,image}=req.body;
   const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "posts",
  });

    const newPostData = {
      caption,
      image: { public_id: myCloud.public_id, url: myCloud.secure_url },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);
    const user = await getSingleUser(req.user._id);
    user.posts.push(post._id);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Post Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeandUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await getPost(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: false,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: false,
        message: "Post liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await getSingleUser(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");
    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await getPost(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    }

    if (req.user._id.toString() !== post.owner.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorize",
      });
    }
    const { caption } = req.body;
    post.caption = caption;
    await post.save();
    return res.status(200).json({
      success: false,
      message: "Updated Caption Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = getPost(req.params.id);
    if (req.user._id.toString() !== post.owner.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorize",
      });
    }

    let commentIndex = -1;

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id) {
        return post.comments.splice(index, 1);
      }
    });
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Selected Comment has deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addCommentToPost = async (req, res) => {
  try {
    console.log("Enter",req.body.comment);
    const post = await getPost(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    }
    // if (req.user._id.toString() !== post.owner.toString()) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorize",
    //   });
    // }

    let commentExist = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentExist = index;
      }
    });
    if (commentExist != -1) {
      post.comments[commentExist].comment = req.body.comment;
      await post.save();
      return res.status(201).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(201).json({
        success: true,
        message: "Comment Added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
