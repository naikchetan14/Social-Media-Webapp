import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpdateComment,
  getPostofFollowing,
} from "../../Actions/postActions/postActions";
import User from "../User/User";

const CommentModal = React.memo(
  ({ comments = [], setCommentsToggle, postId, ownerId }) => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    console.log("comments", comments);

    const [comment, setComment] = useState("");
    const addCommentHandler = async (e) => {
      e.preventDefault();
      await dispatch(addUpdateComment({ postId, comment }));
      await dispatch(getPostofFollowing());
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="w-[50%] max-h-[70vh] bg-white shadow-md z-50 p-4 relative rounded-md">
          <div className="absolute right-10">
            <ImCross onClick={() => setCommentsToggle(false)}></ImCross>
          </div>
          <div>
            <h1 className="font-bold text-3xl">Comments</h1>
            <form
              className="flex flex-row justify-center w-[100%]"
              onSubmit={addCommentHandler}
            >
              <div className="relative mx-auto w-[45%]">
                <input
                  type="text"
                  placeholder="Enter Your Comment"
                  className="p-2 border-2 border-gray-400 rounded-md w-full"
                  onChange={(e) => setComment(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="absolute p-2 right-0 bg-black text-white border-2 border-gray-400 rounded-md"
                >
                  Add
                </button>
              </div>
            </form>
            <div className="p-4">
              {comments && comments.length > 0 ? (
                comments.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-row items-center justify-between gap-3 mb-3"
                  >
                    <User
                      imageSrc={item?.user?.avatar?.url}
                      name={item?.comment}
                    />
                    {ownerId === user._id && (
                      <div>
                        <MdDelete size={20}></MdDelete>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h6 className="text-sm font-serif font-bold text-black">
                  No comments on this Post
                </h6>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CommentModal;
