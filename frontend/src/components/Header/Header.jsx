import React, { useEffect, useState } from "react";
import leafImage from "../../assets/leaf.png";
import userImage from "../../assets/user.png";
import { Link, Outlet } from "react-router-dom";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { logout } from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, users, message } = useSelector(
    (store) => store.user
  );
  const alert = useAlert();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const logouthandler = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      alert.error(error);
    }
  };

  

  // useEffect(() => {
  //   if (error) {
  //     navigate("/login");
  //     alert.error(error);
  //     dispatch(clearError());
  //   }
  //   if (message) {
  //     alert.success(message);
  //     dispatch(clearMessage());
  //   }
  //   if (!isAuthenticated && !user) {
  //     navigate("/login");
  //   }
  // }, [error, message, isAuthenticated, user]);
  return (
    <>
      <div className="flex sticky top-0 bg-white left-0 z-30 flex-row justify-between items-center px-4 pt-2 pb-2 shadow">
        <div className="flex fle-row items-center justify-center gap-2">
          <div>
            <img
              src={leafImage}
              alt="leafImage"
              className="w-[50px] object-cover"
            ></img>
          </div>
          <Link to={"/"}>
            <h1 className="text-purple-800 md:text-4xl text-2xl font-bold">
              Social Insta
            </h1>
          </Link>
        </div>

        {/* <div className="search md:block hidden">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-purple-600 p-2 rounded-md w-[300px]"
      ></input>
    </div> */}
        {/* <div className="user border-2 border-purple-900 rounded-full p-1">
      <img src={userImage} className="w-[40px]" alt="User Image"></img>
    </div> */}
        <div className="flex flex-row gap-4 items-center">
          <Link to="user/search">
            <FaSearch className="hover:text-purple-900 md:text-3xl text-xl md:block hidden"></FaSearch>
          </Link>
          <div
            onClick={() => setToggleDropdown(!toggleDropdown)}
            className="flex flex-row items-center gap-2"
          >
            <div >
            <User users={null} imageSrc={user?.avatar?.url}></User>
            </div>
          </div>
          <div className="lg:hidden">
            <RxHamburgerMenu onClick={toggleSidebar} size={30}></RxHamburgerMenu>
          </div>
          {toggleDropdown === true && (
            <div className="dropBar absolute top-[100%] bg-white z-20 shadow-lg p-4 right-0 min-h-[100px] flex flex-col gap-3 transition ease-in-out delay-300">
              <div>
                <Link to="/newpost" className="text-md hover:text-purple-900">
                  Create Post
                </Link>
              </div>

              <div>
                <Link
                  to={`/profile/${user._id}`}
                  className="text-md hover:text-purple-900"
                >
                  Your Acccount
                </Link>
              </div>

              <div>
                <Link to={`/chat`} className="text-md hover:text-purple-900">
                  Chat
                </Link>
              </div>

              <div>
                <button
                  onClick={logouthandler}
                  className="text-md hover:text-purple-900"
                >
                  {" "}
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
