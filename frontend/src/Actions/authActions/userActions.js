import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const DEV_URL = "http://localhost:4000";

export const loginUser = createAsyncThunk(
  "login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEV_URL}/api/v1/login`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("formData",formData)
      const response = await axios.post(
        `${DEV_URL}/api/v1/register`,
        formData,
        {
          withCredentials: true,
        },
      
      );
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("logout", async (thunkAPI) => {
  try {
    const response = await axios.get(`${DEV_URL}/api/v1/logout`, {
      withCredentials: true,
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    // rejectWithValue(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getLoginuser = createAsyncThunk(
  "getLoginUser",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${DEV_URL}/api/v1/me`,{
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${DEV_URL}/api/v1/update/profile`,formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserProfileData = createAsyncThunk(
  "getUserProfileData",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`${DEV_URL}/api/v1/user/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const followUser = createAsyncThunk(
  "followUser",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`${DEV_URL}/api/v1/follow/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllUser = createAsyncThunk("getAllUser", async (thunkAPI) => {
  try {
    const response = await axios.get(`${DEV_URL}/api/v1/all/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // rejectWithValue(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateUserPassword = createAsyncThunk(
  "updateUserPassword",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`${DEV_URL}/api/v1/update/password`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return thunkAPI.rejectWithValue(error.response.data.message);p
    }
  }
);
