import { useEffect, useState } from "react";

import Header from "./components/Header/Header.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginuser } from "./Actions/authActions/userActions.js";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Post from "./pages/post/Post.jsx";
import UpdatePassword from "./pages/updatepassword/UpdatePassword.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import UpdateProfile from "./pages/updateprofile/UpdateProfile.jsx";
import Search from "./pages/search/Search.jsx";
import Chat from "./pages/chat/Chat.jsx";
import Footer from "./components/footer/Footer.jsx";
import Loader from "./components/Loader/Loader.jsx";
function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Track
  const [isOpen,setIsOpen]=useState(false);
  const [loading, setLoading] = useState(true);
  // const [pageLoading, setPageLoading] = useState(false); // State to manage
  useEffect(() => {
    console.log("useEffect called");
    try {
      dispatch(getLoginuser()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the delay as needed
    };

    handleRouteChange(); // Run on location change
  }, [location]);

 // Show initial loader when data is being fetched
 if (loading) {
  return <Loader />;
}
  const toggleSidebar=()=>{
        setIsOpen(!isOpen);
  }

  return (
    <>
      {/* <Header></Header> */}
      {loading && <Loader />} {/* Show loader when a page is changing */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header toggleSidebar={toggleSidebar} />
              </ProtectedRoute>
            }
          >
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Home isOpen={isOpen}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:id?"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="newpost"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              path="update/password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="update/profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="user/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Route>

        </Routes>
        <Footer></Footer>
    </>
  );
}

export default App;
