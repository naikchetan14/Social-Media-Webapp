import React, { useEffect, useState } from "react";
import userImage from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import {
  followUser,
  getUserProfileData,
  loginUser,
} from "../../Actions/authActions/userActions";
import FollowerModal from "../../components/modals/FollowerModal";
import FollowingModal from "../../components/modals/FollowingModal";
import LikeModal from "../../components/modals/LikeModal";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import { postclearError, postclearMessage } from "../../Reducers/postReducers/postReducers";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";

const Profile = () => {
  DocumentTitle("Profile")
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likeModal, setLikedToggle] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const user = useSelector((store) => store.user.userData);
  const logInUserID = useSelector((store) => store.user.user);
  const { message, error } = useSelector((store) => store.user);
  const { message: LikeMessage, error: likeError } = useSelector(
    (state) => state.post
  );
  const { id = null } = useParams();

  const followUserHandler = async () => {
    await dispatch(followUser(user._id));
    dispatch(getUserProfileData(id));
  };
  useEffect(() => {
    if (id !== null) {
      dispatch(getUserProfileData(id));
    }
  }, [id]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (LikeMessage) {
      alert.success(LikeMessage);
      dispatch(getUserProfileData(id));
      dispatch(postclearMessage());
    }
    if (likeError) {
      alert.error(likeError);
      dispatch(postclearError());
    }
    
    for (let index = 0; index < user?.followers?.length; index++) {
      if (user.followers[index]._id === logInUserID._id) {
        setIsFollowed(!isFollowed);
        return;
      }
    }
  }, [message, error, user,LikeMessage,likeError]);

  return (
    <>
      <div className="flex flex-row">
        <div className="sidebar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto z-5 sticky w-[18%] shadow-md md:hidden lg:block hidden top-[67.2px] bottom-0 scroll h-[calc(100vh-67.2px)]">
          <div className="allUsers p-4 flex flex-col justify-center items-center text-center gap-6">
            <div className="user border-2 border-purple-800 rounded-full w-[120px] h-[120px]">
              <img
                src={user?.avatar?.url || userImage}
                className="object-cover rounded-full h-full w-full"
                alt="User Image"
              ></img>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-600">{user?.name}</p>
            </div>

            <div>
              <p className="font-semibold text-md">{user?.posts?.length}</p>
              <span className="text-xl text-gray-400">Posts</span>
            </div>

            <div onClick={() => setLikedToggle(!likeModal)}>
              <p className="font-semibold text-md">
                {user?.likes?.length || 0}
              </p>
              <span className="text-xl text-gray-400">Likes</span>
            </div>

            <div onClick={() => setFollowerModal(!followerModal)}>
              <p className="font-semibold text-md">
                {user?.followers?.length || 0}
              </p>
              <span className="text-xl text-gray-400">Followers</span>
            </div>

            <div onClick={() => setFollowingModal(!followingModal)}>
              <p className="font-semibold text-md">
                {user?.following?.length || 0}
              </p>
              <span className="text-xl text-gray-400">Following</span>
            </div>

            <div></div>
          </div>
          {logInUserID._id === user._id && (
            <>
              <div className="text-center">
                <button className="mt-4 px-4 py-2 text-xl bg-purple-900 border-2 border-transparent rounded-md text-white hover:bg-white hover:border-purple-600 hover:text-purple-900 transition-colors duration-300">
                  Delete Account
                </button>
              </div>
              <div className="text-center">
                <Link to={"/update/profile"}>
                  <button className="mt-1 px-4 py-2 text-xl bg-red-900 border-2 border-transparent rounded-md text-white hover:bg-white hover:border-red-600 hover:text-red-900 transition-colors duration-300">
                    Update Profile
                  </button>
                </Link>
              </div>
              <div className="text-center">
                <Link to={"/forget/password"}>
                  <button className="mt-1 px-4 py-2 text-xl bg-red-900 border-2 border-transparent rounded-md text-white hover:bg-white hover:border-red-600 hover:text-red-900 transition-colors duration-300">
                    Forget Password?
                  </button>
                </Link>
              </div>
              <div className="text-center">
                <Link to={"/update/password"}>
                  <button className="mt-1 px-4 py-2 text-xl bg-red-900 border-2 border-transparent rounded-md text-white hover:bg-white hover:border-red-600 hover:text-red-900 transition-colors duration-300">
                    Update Password?
                  </button>
                </Link>
              </div>
            </>
          )}
          {logInUserID._id !== user._id && (
            <div className="text-center">
              <button
                onClick={followUserHandler}
                className="mt-1 w-[70%] text-md px-4 py-2 text-xl bg-purple-900 border-2 border-transparent rounded-md text-white hover:bg-white hover:border-red-600 hover:text-red-900 transition-colors duration-300"
              >
                {isFollowed ? "Unfollow" : "follow"}
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="px-4 pt-2 pb-2">
            <span className="text-4xl font-semibold">Your Posts</span>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.posts && user?.posts?.length > 0 ? (
              user.posts.map((post) => (
                <Post
                  key={post._id}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post?.image?.url}
                  likes={post?.likes}
                  comments={post?.comments}
                  ownerImage={post?.owner?.avatar?.url}
                  ownerName={post?.owner?.name}
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
      {followerModal && (
        <FollowerModal
          setFollowerModal={setFollowerModal}
          followers={user?.followers}
        ></FollowerModal>
      )}
      {followingModal && (
        <FollowingModal
          setFollowingModal={setFollowingModal}
          following={user?.following}
        ></FollowingModal>
      )}
      {likeModal && (
        <LikeModal
          setLikedToggle={setLikedToggle}
          likes={user?.posts?.likes}
        ></LikeModal>
      )}
    </>
  );
};

export default Profile;
