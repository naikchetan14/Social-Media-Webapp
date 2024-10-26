import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";

import { IoIosLogOut } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { getAllUser, logout } from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import {
  postclearError,
  postclearMessage,
} from "../../Reducers/postReducers/postReducers.js";
import Post from "../../components/Post/Post.jsx";
import "./home.css";
import User from "../../components/User/User.jsx";
import { getPostofFollowing } from "../../Actions/postActions/postActions.js";
import Button from "../../components/Button.jsx";
import DocumentTitle from "../../DynamicTitle/DocumentTitle.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const Home = ({ isOpen }) => {
  DocumentTitle("Home");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user, error, users, message } = useSelector(
    (store) => store.user
  );
  const { message: LikeMessage, error: likeError } = useSelector(
    (state) => state.post
  );

  const { loading } = useSelector((state) => state.post);

  const { posts } = useSelector((store) => store.post);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getPostofFollowing());
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
      return;
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
      return;
    }
    if (!isAuthenticated && !user) {
      navigate("/login");
      return;
    }
    if (LikeMessage) {
      alert.success(LikeMessage);
      dispatch(postclearMessage());
      return;
    }
    if (likeError) {
      alert.error(likeError);
      dispatch(postclearError());
      return;
    }
  }, [dispatch, alert, LikeMessage, likeError, error, users, message]);
  return (
    <div>
      <div className="flex lg:flex-row">
        <div
          className={`sidebar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto z-5 shadow-md lg:block ${
            isOpen ? "block fixed" : "hidden sticky"
          }  min-w-[10%] transition-all ease-in-out delay-300 duration-300  bg-white md:top-[76px] top-[80px] left-0 z-20 bottom-0 scroll h-[calc(100vh-67.2px)]`}
        >
          <div className="px-4 py-2">
            <span className="text-md font-semibold">All Users</span>
          </div>
          <div className="allUsers p-4 flex flex-col justify-center gap-3">
            <div className="flex flex-col gap-4">
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <Link to={`profile/${user._id}`}>
                    <User user={user} imageSrc={null}></User>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="posts">
          <div className="md:p-2 px-2">
            <span className="text-4xl font-semibold">Posts</span>
          </div>
          <div className="md:p-4 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {loading === true && <Loader></Loader>}
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerId={post.owner._id}
                  isAccount={post.owner._id === user._id ? true : false}
                  isDelete={post.comments.user === user._id ? true : false}
                />
              ))
            ) : (
              <h1 className="text-md font-semibold">No Posts Yet...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
