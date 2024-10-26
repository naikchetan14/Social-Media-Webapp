import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const DEV_URL = "http://localhost:4000";

export const getPostofFollowing = createAsyncThunk(
  "getPostofFollowing",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${DEV_URL}/api/v1/posts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const likePost = createAsyncThunk("likePost", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${DEV_URL}/api/v1/post/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // rejectWithValue(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const createNewPost = createAsyncThunk(
  "createNewPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${DEV_URL}/api/v1/post/upload`,
        data,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addUpdateComment = createAsyncThunk(
  "addUpdateComment",
  async ({postId, comment},thunkAPI) => {
    try {
      console.log("postId",postId)
      const response = await axios.put(
        `${DEV_URL}/api/v1/post/comment/${postId}`,{comment},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const updateUserPostCaption = createAsyncThunk(
  "updateUserPostCaption",
  async ({postId,caption},thunkAPI) => {
    try {
      const response = await axios.put(
        `${DEV_URL}/api/v1/post/${postId}`,{caption},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
