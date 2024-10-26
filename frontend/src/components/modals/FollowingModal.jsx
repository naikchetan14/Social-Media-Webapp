import React from "react";
import User from "../User/User";
import { ImCross } from "react-icons/im";

const FollowingModal = React.memo(({ following=[], setFollowingModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-[50%] max-h-[70vh] bg-white shadow-md z-50 p-4 relative rounded-md">
        <div className="absolute right-10">
          <ImCross onClick={() => setFollowingModal(false)}></ImCross>
        </div>
        <div>
          <h1 className="font-bold text-3xl">Following</h1>
          <div className="p-4">
            {following && following.length > 0 ? (
              following.map((item) => (
                <div key={item._id} className="flex flex-col gap-3 mb-3">
                  <User imageSrc={item.avatar.url} name={item.name} />
                </div>
              ))
            ) : (
              <h6 className="text-sm font-serif font-bold text-black">
                No Following...
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});;

export default FollowingModal;
