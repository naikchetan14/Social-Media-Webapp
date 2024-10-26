const express = require("express");
const dotenv = require("dotenv");
const cookieParser=require("cookie-parser");
const cors = require('cors');
const cloudinary = require('cloudinary')


const app = express();
const corsOptions = {
  //   origin: ["http://localhost:3000"],
  origin: true,
  credentials: true,
};




app.use(cookieParser());
app.use(cors(corsOptions));  


if (process.env.NODE_ENV !== "production") {
  dotenv.config({path:'backend/config/.env'});
}
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Importing Routes
const user=require("./routes/user");
const post=require("./routes/post");
const chat=require("./routes/chat");
const message=require("./routes/message");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1",chat);
app.use("/api/v1",message);


module.exports = app;
