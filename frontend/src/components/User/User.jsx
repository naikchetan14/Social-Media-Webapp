import React from "react";
import userImage from "../../assets/user.png";
import { Link } from "react-router-dom";

const User = ({
  user = {},
  imageSrc = "",
  name = "",
  onClick=()=>{}
}) => {
  console.log("name", name);
  const shouldWeDisplay = imageSrc === null && user !== null && name !== null;

  return (
    <>
      {shouldWeDisplay ? (
        <>
          <div
            to={`/profile/${user._id}`}
            onClick={()=>onClick(user)}
          >
            <div className="flex flex-row items-center gap-5" key={user._id}>
              <div className="user border-2 w-[66px] h-[66px] border-purple-900 rounded-full">
                <img
                  src={user?.avatar?.url || userImage}
                  className="w-full h-full object-cover rounded-full"
                  alt="User Image"
                ></img>
              </div>
              <div>
                <span className="text-md font-bold">{user.name}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-3 items-center">
            <div className="user border-2 w-[60px] h-[60px]  border-purple-900 rounded-full">
              <img
                src={imageSrc}
                className="w-full h-full object-cover rounded-full"
                alt="User Image"
              ></img>
            </div>
            {name && (
              <div>
                <span className="text-md font-bold">{name}</span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(User);
