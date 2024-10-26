import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPostCaption } from "../../Actions/postActions/postActions";
import { useAlert } from "react-alert";
import { getUserProfileData } from "../../Actions/authActions/userActions";

const UpdateCaption = React.memo(
  ({ caption, setUpdateCaptionToggle, postId }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [updateCaption, setUpdateCaption] = useState(caption);
    const { user }=useSelector((store)=>store.user);

    const updateCaptionHandler = async(e) => {
      e.preventDefault();
      if (caption !== updateCaption) {
        await dispatch(updateUserPostCaption({ postId, caption: updateCaption }));
        await dispatch(getUserProfileData(user._id));
      } else {
        alert.error("Please Update Caption");
      }
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="w-[50%] max-h-[70vh] bg-white shadow-md z-50 p-4 relative rounded-md">
          <div className="absolute right-10">
            <ImCross onClick={() => setUpdateCaptionToggle(false)}></ImCross>
          </div>
          <div>
            <h1 className="font-bold text-3xl">Update Caption</h1>
            <form
              className="flex flex-row justify-center w-[100%] mt-3 mb-3"
              onSubmit={updateCaptionHandler}
            >
              <div className="relative mx-auto w-[45%]">
                <input
                  type="text"
                  placeholder="Update Caption..."
                  className="p-2 border-2 border-gray-400 rounded-md w-full"
                  value={updateCaption}
                  onChange={(e) => setUpdateCaption(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="absolute p-2 right-0 bg-black text-white border-2 border-gray-400 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default UpdateCaption;
