const jwt = require("jsonwebtoken");
const { getSingleUser } = require("../services/userServices");


exports.isAuthenticated = async (req,res,next) => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await getSingleUser(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
