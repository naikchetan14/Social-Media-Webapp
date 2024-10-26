import { createSlice } from "@reduxjs/toolkit";
import { addUpdateComment, createNewPost, getPostofFollowing, likePost, updateUserPostCaption } from "../../Actions/postActions/postActions";


let initialState = {
   loading:false,
   posts:[],
   message:null,
   error:null
};
const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    postclearMessage(state) {
      state.message = null;
    },
    postclearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(getPostofFollowing.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getPostofFollowing.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
    });
    builder.addCase(getPostofFollowing.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(likePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createNewPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addUpdateComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addUpdateComment.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addUpdateComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserPostCaption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUserPostCaption.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateUserPostCaption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { postclearError,postclearMessage } = postSlice.actions;
export default postSlice.reducer;
