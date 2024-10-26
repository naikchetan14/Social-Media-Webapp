import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidationSchema } from "../../yupValidations/authValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Actions/authActions/userActions";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";

const UpdateProfile = () => {
  DocumentTitle("Update Profile")
  const { user, message, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const alert = useAlert();

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log("Enter hererree", values);

      try {
        await dispatch(
          updateUserProfile({ ...values, avatar: image })
        ).unwrap();
      } catch (error) {
        console.log("error");
        alert.error(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (message) {
      alert.show(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  return (
    <div className="min-h-[100vh] flex items-center bg-gradient-to-b from-violet-600 to-red-600">
      <div className="md:w-[30%] w-[90%] border-2 rounded-lg shadow border-white-400 mx-auto p-8 bg-white">
        <div>
          <h1 className="text-center text-4xl mb-5 font-bold text-red-900">
            Update Profile
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
            <div>
              {image ? (
                <img
                  src={image}
                  alt="image"
                  className="object-cover max-h-[200px] mx-auto block rounded-full p-5"
                ></img>
              ) : (
                ""
              )}
            </div>
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
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
