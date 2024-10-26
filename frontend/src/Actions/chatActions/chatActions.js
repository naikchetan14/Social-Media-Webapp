import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const DEV_URL = "http://localhost:4000";

export const accesschat = createAsyncThunk(
  "accesschat",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${DEV_URL}/api/v1/accesschats`,
        { userId },

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addMessage=createAsyncThunk("addMessage",
  async(values,{ rejectWithValue})=>{
    try {
      const response = await axios.post(
        `${DEV_URL}/api/v1/sendmessage`,values,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)
export const getUserChats = createAsyncThunk(
  "getUserChats",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${DEV_URL}/api/v1/allmessages/${chatId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);
