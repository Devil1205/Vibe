import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/post/postsSlice";
import userDetailsSlice from "./features/user/userDetailsSlice";
import userSlice from "./features/user/userSlice";
import suggestionsSlice from "./features/user/suggestionsSlice";
import LikeSlice from "./features/post/LikeSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        user: userSlice,
        userDetails: userDetailsSlice,
        suggestions: suggestionsSlice,
        like: LikeSlice
    },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
