import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../yupValidations/authValidationSchema";
import { loginUser } from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearMessage
} from "../../Reducers/authReducers/userReducers";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";

const Login = () => {
  DocumentTitle("login")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, error,message } = useSelector(
    (store) => store.user
  );
  const alert = useAlert();
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values)).unwrap();
      } catch (error) {
        alert.error(error);
      }
    },
  });

  
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
    if (isAuthenticated && user !== null) {
      navigate("/");
    }
  }, [alert, error, dispatch, isAuthenticated, user,message]);

  return (
    <div className="h-[100vh] flex items-center bg-gradient-to-b from-violet-600 to-red-600">
      <div className="md:w-[30%] w-[90%] border-2 rounded-lg shadow border-white-400 mx-auto p-8 bg-white">
        <div>
          <h1 className="text-center text-4xl mb-5 font-bold text-red-900">
            Log in
          </h1>
        </div>
        <form
          className="flex flex-col items-center gap-7"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[100%]">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email..."
              className="p-2 border-2 border-grey-200 shadow mt-2 block mx-auto md:w-[90%] w-[100%]"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div className="w-[90%] text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="w-[100%]">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
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
            <button
              type="submit"
              className="text-white md:w-[90%] w-[100%] bg-red-900 pt-2 pb-2 mx-auto block rounded"
            >
              Sign In
            </button>
          </div>

          <div>
            <span className="text-grey-200">Or</span>
          </div>
          <div className="w-[100%]">
            <Link to={"/register"}>
              <button
                type="submit"
                className="text-white md:w-[90%] w-[100%] bg-red-900 pt-2 pb-2 mx-auto block rounded"
              >
                Create Account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
