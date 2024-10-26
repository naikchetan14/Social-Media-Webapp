const mongoose = require("mongoose");

exports.connectToDataBase = async () => {
  try {
    if (process.env.NODE_ENV !== "Production") {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected");
    }
  } catch (error) {
    console.log(error.message);
  }
};
