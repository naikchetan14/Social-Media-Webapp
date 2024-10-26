import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidationSchema } from "../../yupValidations/authValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import { clearError } from "../../Reducers/authReducers/userReducers";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";

const Login = () => {
  DocumentTitle("Register");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const alert = useAlert();
  const { user, isAuthenticated, error } = useSelector((store) => store.user);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      console.log("Values", values);
   
      try {
        await dispatch(registerUser({...values,avatar:image})).unwrap();
        alert.show("Registered Successfully");
      } catch (error) {
        console.log("error");
        alert.error(error);
        await dispatch(clearError());
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file",file);

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (isAuthenticated && user !== null) {
      navigate("/");
    }
  }, [isAuthenticated, user]);
  return (
    <div className="h-[100vh] flex items-center bg-gradient-to-b from-violet-600 to-red-600">
      <div className="md:w-[30%] w-[90%] border-2 rounded-lg shadow border-white-400 mx-auto p-8 bg-white">
        <div>
          <h1 className="text-center text-4xl mb-5 font-bold text-red-900">
            Create Account
          </h1>
        </div>
        <form
          className="flex flex-col items-center gap-7"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[100%]">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name..."
              className="p-2 border-2 border-grey-200 shadow mt-2 block mx-auto md:w-[90%] w-[100%]"
              onChange={formik.handleChange}
              value={formik.values.name}
            ></input>
            {formik.touched.name && formik.errors.name ? (
              <div className="w-[90%] text-red-600">{formik.errors.name}</div>
            ) : null}
          </div>
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
          <div>{image ? <img src={image} alt="image" className="object-cover max-h-[200px] mx-auto block rounded-full p-5"></img>: ""}</div>
            <input
              type="file"
              id="image"
              name="image"
              className="p-4 border-2 border-grey-200 bg-purple-900 text-white  shadow mt-2 block mx-auto md:w-[90%] w-[100%] rounded-full"
              onChange={handleImageChange}
            ></input>
          </div>
          <div className="w-[100%]">
            <button
              type="submit"
              className="text-white md:w-[90%] w-[100%] bg-red-900 pt-2 pb-2 mx-auto block rounded"
            >
              Sign Up
            </button>
          </div>

          <div>
            <span className="text-grey-200">Or</span>
          </div>
          <div className="w-[100%]">
            <Link to={"/login"}>
              <button
                type="submit"
                className="text-white md:w-[90%] w-[100%] bg-red-900 pt-2 pb-2 mx-auto block rounded"
              >
                Log In
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
