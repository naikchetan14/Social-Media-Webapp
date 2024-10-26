import { createSlice } from "@reduxjs/toolkit";
import {
  followUser,
  getAllUser,
  getLoginuser,
  getUserProfileData,
  loginUser,
  logout,
  registerUser,
  updateUserPassword,
  updateUserProfile,
} from "../../Actions/authActions/userActions";

let initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  users: [],
  userData: {},
};
const authSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUserProfileData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserProfileData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload.user;
    });
    builder.addCase(getUserProfileData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getLoginuser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getLoginuser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(getLoginuser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(getAllUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }); 

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload.message;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    });
  },
});
export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
