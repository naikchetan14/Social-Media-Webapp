import { createSlice } from "@reduxjs/toolkit";
import { accesschat, addMessage, getUserChats } from "../../Actions/chatActions/chatActions";

let initialState = {
  loading: false,
  error: null,
  chatMessages: [],
  chats: {},
  message:{}
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message=null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accesschat.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(accesschat.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload.chats;
    });
    builder.addCase(accesschat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUserChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chatMessages = action.payload.messages;
    });
    builder.addCase(getUserChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, clearMessage } = chatSlice.actions;

export default chatSlice.reducer;
