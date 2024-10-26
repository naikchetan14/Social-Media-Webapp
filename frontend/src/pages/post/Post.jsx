import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { postvalidationSchema } from "../../yupValidations/authValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createNewPost } from "../../Actions/postActions/postActions";
import DocumentTitle from "../../DynamicTitle/DocumentTitle";
import { postclearError, postclearMessage } from "../../Reducers/postReducers/postReducers";


const Post = () => {
  DocumentTitle("Create Post");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const alert = useAlert();
  const { message, error } = useSelector((store) => store.post);
  const initialValues = {
    caption: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: postvalidationSchema,
    onSubmit: async (values) => {
      console.log("Values", values);

      try {
        await dispatch(createNewPost({ ...values, image: image })).unwrap();
      } catch (error) {
        console.log("error");
        alert.error(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

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
      alert.success(message);
      dispatch(postclearMessage());
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(postclearError());
    }
  }, [message, error]);

  return (
    <>
      <div className="min-h-[calc(100vh-67.2px)] flex items-center bg-gradient-to-b from-violet-600 to-red-600">
        <div className="md:w-[30%] w-[90%] border-2 rounded-lg shadow border-white-400 mx-auto p-8 bg-white">
          <div>
            <h1 className="text-center md:text-4xl text-2xl mb-5 font-bold text-red-900">
              Create New Post
            </h1>
          </div>
          <form
            className="flex flex-col items-center gap-7"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-[100%]">
              <input
                type="text"
                id="caption"
                name="caption"
                placeholder="Enter Your Caption..."
                className="p-2 border-2 border-grey-200 shadow mt-2 block mx-auto md:w-[90%] w-[100%]"
                onChange={formik.handleChange}
                value={formik.values.caption}
              ></input>
              {formik.touched.caption && formik.errors.caption ? (
                <div className="w-[90%] text-red-600">
                  {formik.errors.caption}
                </div>
              ) : null}
            </div>

            <div className="w-[100%]">
              <div>
                {image ? (
                  <div className="flex flex-col gap-4 w-[80%] items-center mx-auto">
                    <img
                      src={image}
                      alt="image"
                      className="object-fit max-h-[200px] w-[80%] block mx-auto"
                    ></img>
                    <button
                      type="button"
                      className="inline p-2 mt-4 text-2xl bg-purple-900 border-2 rounded-md text-white hover:text-black
               hover:bg-white hover:border-purple-600"
                      onClick={() => setImage("")}
                    >
                      Cancel
                    </button>
                  </div>
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
                Add New Post
              </button>
            </div>

            <div className="w-[100%] text-center">
              <Link to={"/"}>
                <span className="text-purple-900 font-semibold">
                  Back To Home?
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Post;
