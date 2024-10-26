import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/authActions/userActions";
import User from "../../components/User/User";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";
import userImage from "../../assets/user.png";
import { IoMdSend } from "react-icons/io";
import {
  accesschat,
  addMessage,
  getUserChats,
} from "../../Actions/chatActions/chatActions";
import ChatMesages from "../../components/chat/Chat.jsx";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/chatReducers/chatReducers.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import { useFetcher } from "react-router-dom";
const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;
const Chat = () => {
  DocumentTitle("Chats");
  const { chatMessages, chats, message, error } = useSelector(
    (store) => store.chat
  );
  const [chatText, setChatText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [allMessageData, setAllMessageData] = useState(
    chatMessages ? [...chatMessages] : []
  );
  const alert = useAlert();
  const { user, users } = useSelector((store) => store.user);

  console.log("chatMessages", chats, chatMessages);
  const [selectedUser, setSelectedUser] = useState({ ...users[0] });
  const dispatch = useDispatch();
  // useEffect(async() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connection", () => setSocketConnected(true));
  //   dispatch(getAllUser());
  //   const data = await dispatch(accesschat(users[0]._id));
  //   console.log("data", data);
  //   const chatId = data?.payload?.chats?._id;
  //   if (chatId) {
  //     await dispatch(getUserChats(chatId));
  //     socket.emit("join chat", selectedUser._id);
  //   } else {
  //     console.error("Chat ID not found in response");
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const initializeSocket = async () => {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
      setSocketConnected(true);
  
      await dispatch(getAllUser());
  
      if (users && users.length > 0) {
        const userId=users[0]._id!==user._id?users[0]._id:users[1]._id;
        const data = await dispatch(accesschat(userId));
        console.log("data", data);
  
        const chatId = data?.payload?.chats?._id;
        if (chatId) {
          await dispatch(getUserChats(chatId));
          socket.emit("join chat", users[0]._id);
        } else {
          console.error("Chat ID not found in response");
        }
      } else {
        console.error("No users available to access chat.");
      }
    };
  
    initializeSocket();
  }, []);

  const sendMessage = async (key) => {
    console.log("allMessageData", allMessageData);
    if (chatText === "") {
      alert.error("You can't send Empty message!");
      return;
    }
    if (key === "Enter") {
      const data = await dispatch(
        addMessage({ chatId: chats?._id, content: chatText })
      );
      console.log("My Daatata", data);
      await dispatch(getUserChats(data?.payload?.message?.chat?._id));
      console.log("reach Here");
      socket.emit("new message", data?.payload?.message);
      console.log("allMEssagedata", allMessageData);
      setAllMessageData([...chatMessages]);
      setChatText("");
      console.log("reach 222");
    } else {
      alert.error("Press Enter To Send Messsage!");
    }
  };

  const handleclickFunc = async (user) => {
    console.log("User", user);
    setSelectedUser(user);
    console.log("Running", user._id);
    const data = await dispatch(accesschat(user._id));
    console.log("data", data);
    const chatId = data?.payload?.chats?._id;
    if (chatId) {
      await dispatch(getUserChats(chatId));
      socket.emit("join chat", selectedUser._id);
    } else {
      console.error("Chat ID not found in response");
    }
    console.log("messages chats", chatMessages, chats);
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare?._id !== newMessageReceived?.chat?._id
        ) {
          //nptifc
        } else {
          setAllMessageData([...allMessageData, newMessageReceived]);
        }
      });
    }
  });

  useEffect(() => {
    console.log("comapare chat", selectedChatCompare);
  }, [chats]);
  return (
    <div className="mx-auto flex flex-col md:flex-row p-2 md:p-5 gap-2 bg-gradient-to-b from-violet-600 to-red-600 sm:min-h-[calc(100vh-67.2px)]  md:h-[calc(100vh-67.2px)]">
      <div className="max-h-[98%] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto users flex flex-col gap-3 p-4 bg-gray-100 grow-0 border-2 rounded-md border-violet-300">
        {users &&
          users?.map((currentUser) =>
            user._id !== currentUser._id ? (
              <User
                key={currentUser._id}
                user={currentUser}
                imageSrc={null}
                onClick={handleclickFunc}
              />
            ) : null
          )}
      </div>

      <div className="max-h-[500px] chats md:max-h-[98%] bg-gray-300 w-full flex-1 items-center border-2 rounded-md border-violet-300 overflow-auto">
        <div className="">
          <div className="flex flex-row justify-between bg-violet-100 items-center">
            <div className="flex flex-row gap-2 items-center p-2 ">
              <div className="user border-2 w-[66px] h-[66px] border-purple-900 rounded-full">
                <img
                  src={selectedUser?.avatar?.url}
                  className="w-full h-full object-cover rounded-full"
                  alt="User Image"
                ></img>
              </div>
              <h1>{selectedUser?.name}</h1>
            </div>
            <div className="m-3">
              <BsThreeDotsVertical size={20}></BsThreeDotsVertical>
            </div>
          </div>

          {allMessageData && allMessageData.length > 0 ? (
            allMessageData.map((chat) => (
              <ChatMesages chat={chat} key={chat._id}></ChatMesages>
            ))
          ) : (
            <div className="max-w-[200px] mx-auto m-3 shadow-md">
              <h1 className="bg-white p-2 text-center  text-violet-900 font-semibold rounded-md">
                No messages to show!
              </h1>
            </div>
          )}

          <div className="bottom-[20px] w-[50%] absolute p-4 z-20 text-center mx-auto">
            <div className="relative flex items-center mx-auto">
              <input
                className="w-full p-4 rounded-md border-2 border-violet-300 mx-auto hover:border-2 hover:border-violet-900"
                placeholder="Send Message here..."
                value={chatText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage("Enter");
                  }
                }}
                onChange={(e) => setChatText(e.target.value)}
              ></input>
              <IoMdSend
                className="absolute right-[30px] text-2xl text-violet-900"
                onClick={(e) => sendMessage("Enter")}
              ></IoMdSend>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
