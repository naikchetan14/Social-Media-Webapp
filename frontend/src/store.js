import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducers/userReducers.js"
import postReducers from "./Reducers/postReducers/postReducers.js";
import chatReducers from "./Reducers/chatReducers/chatReducers.js";
const store=configureStore({
    reducer:{
        user:authReducer,
        post:postReducers,
        chat:chatReducers
    },
})

export default store;