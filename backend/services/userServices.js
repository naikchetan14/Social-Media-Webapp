const User = require("../models/User.js");

exports.getSingleUser = (id) => {
  try {
    return User.findById(id);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserDetailByEmail = (email) => {
  try {
    return  User.findOne({email:email});
  } catch (error) {
    console.log(error.message);
  }
};

exports.deletUser=(id)=>{
  try {
    return User.deleteOne(id);
  } catch (error) {
    console.log(error.message);
  }
}

exports.getAllUsers=()=>{
  try {
    return User.find();
  } catch (error) {
    console.log(error.message);
  }
}
