import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  loginUser,
  logout,
  updateUserPassword,
} from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";

const UpdatePassword = () => {
  DocumentTitle("Update Password")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, error, message } = useSelector(
    (store) => store.user
  );

  const alert = useAlert();
  let initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log("Values", values);
      formik.resetForm();
      try {
        await dispatch(
          updateUserPassword({
            oldPassword: values.password,
            newPassword: values.confirmPassword,
          })
        ).unwrap();
        await dispatch(logout()).unwrap();
       
      } catch (error) {
        // alert.error(error);
        console.log(error)
      }
    },
  });

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/register");
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if(message){
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [isAuthenticated, user, error, message, navigate, alert, dispatch]);

  return (
    <div className="min-h-[calc(100vh-67.2px)]  flex items-center bg-gradient-to-b from-violet-600 to-red-600">
      <div className="md:w-[30%] w-[90%] border-2 rounded-lg shadow border-white-400 mx-auto p-8 bg-white">
        <div>
          <h1 className="text-center md:text-4xl text-2xl mb-5 font-bold text-red-900">
            Update Password
          </h1>
        </div>
        <form
          className="flex flex-col items-center gap-7"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[100%]">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter the old Password"
              className="p-2 border-2 border-grey-200 shadow mt-2 block mx-auto md:w-[90%] w-[100%]"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div className="w-[90%] text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="w-[100%]">
            <input
              type="password"
              id="password"
              name="confirmPassword"
              placeholder="Enter new Password"
              className="p-2 border-2 border-grey-200 shadow mt-2 block mx-auto md:w-[90%] w-[100%]"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            ></input>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="w-[90%] text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className="w-[100%]">
            <button
              type="submit"
              className="text-white md:w-[90%] w-[100%] bg-red-900 pt-2 pb-2 mx-auto block rounded"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
