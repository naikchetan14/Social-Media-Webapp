import React, { useEffect, useState } from "react";
import { LiaCommentSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai"; // Import the heart iconimport userImage from "../../assets/user.png";

import { useDispatch, useSelector } from "react-redux";
import {
  getPostofFollowing,
  likePost,
} from "../../Actions/postActions/postActions";
import User from "../User/User";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import LikeModal from "../modals/LikeModal";
import CommentModal from "../modals/CommentModal";

import UpdateCaption from "../modals/UpdateCaption";
import Loader from "../Loader/Loader.jsx";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isAccount = false,
  isDelete = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const alert = useAlert();
  const [likedToggle, setLikedToggle] = useState(false);
  const [commentsToggle, setCommentsToggle] = useState(false);
  const [updateCaptionToggle, setUpdateCaptionToggle] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const likeHandler = async () => {
    try {
      setIsLike(!isLike);
      await dispatch(likePost(postId));
      await dispatch(getPostofFollowing());
      dispatch(clearMessage());
    } catch (error) {
      alert.error(error);
      dispatch(clearError());
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setIsLike(true);
        return;
      }
    });
  }, [likes, user._id]);

  return (
    <>
      <div className="transition max-h-[550px] duration-400 ease-in-out shadow rounded-sm md:max-w-[400px] p-2 hover:border-purple-800 hover:scale-105 border-2">
        <div className="mb-2">
          <img
            src={postImage}
            className="border-2 border-gray-200 p-2 h-[300px] w-[100vw] object-fill"
          ></img>
        </div>
        <div>
          <div className="flex flex-row items-center gap-5">
            <User users={null} imageSrc={ownerImage} name={ownerName}></User>
          </div>

          <div className="p-2">
            <span className="text-sm text-grey-100">{caption}</span>
          </div>
        </div>
        <div className="flex flex-row gap-5 p-2 items-center">
          <div>
            {isLike ? (
              <>
                <AiFillHeart
                  style={{ color: "red", fontSize: "24px" }}
                  className="inline"
                  onClick={likeHandler}
                />
              </>
            ) : (
              <>
                <AiFillHeart
                  style={{ fontSize: "24px", background: "transparent" }}
                  className="inline"
                  onClick={likeHandler}
                />
              </>
            )}
          </div>

          <div className="flex gap-2 flex-row items-center">
            <LiaCommentSolid
              size={20}
              onClick={() => setCommentsToggle(!commentsToggle)}
            ></LiaCommentSolid>
            <p className="font-semibold">{comments.length}</p>
          </div>
          {user._id === ownerId && isAccount && (
            <div>
              <AiOutlineDelete size={20}></AiOutlineDelete>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="inline text-sm p-2 text-purple-800 font-bold">
            <button
              className="bg-none hover:shadow-md p-2 rounded-sm"
              onClick={() => {
                setLikedToggle(!likedToggle);
              }}
            >
              {likes.length} Likes
            </button>
          </span>
          {isAccount === true && ownerId === user._id && (
            <button
              type="button"
              className="hover:shadow-md border-2 hover:border-purple-700 hover:bg-white hover:text-black p-2 rounded-md bg-purple-800 text-white"
              onClick={() => setUpdateCaptionToggle(!updateCaptionToggle)}
            >
              Update Caption
            </button>
          )}
        </div>
      </div>

      {likedToggle && (
        <LikeModal likes={likes} setLikedToggle={setLikedToggle}></LikeModal>
      )}
      {commentsToggle && (
        <CommentModal
          comments={comments}
          setCommentsToggle={setCommentsToggle}
          postId={postId}
          ownerId={ownerId}
        ></CommentModal>
      )}

      {updateCaptionToggle && (
        <UpdateCaption
          caption={caption}
          setUpdateCaptionToggle={setUpdateCaptionToggle}
          postId={postId}
        ></UpdateCaption>
      )}
    </>
  );
};

export default Post;
