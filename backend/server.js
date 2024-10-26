const app = require("./app.js");
const { connectToDataBase } = require("./config/db.js");

const cloudinary = require("cloudinary");

connectToDataBase();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View Credentials' below to copy your API secret
});
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined with the rromm" + room);
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("mew message",newMessageReceived)
    var chat = newMessageReceived?.chat;
    if (!chat?.users || !chat) {
      console.log("User is not defined");
    }

    chat?.users.forEach((user) => {
      if (user._id === newMessageReceived._id) {
        return;
      }
      socket.in(user._id).emit("message received",newMessageReceived);
    });
  });
});
