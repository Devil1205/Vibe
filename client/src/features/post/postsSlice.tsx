import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, user } from "../../interfaces/post";
import axios from "axios";
import { toggleLike } from "./LikeSlice";

const initialState: { posts: post[] | [], loading: boolean, error?: string | null } = { posts: [], loading: false, error: null }

export const getAllPosts = createAsyncThunk("posts/allPosts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/posts/all");
        return data;
    } catch (error) {
        if (!error.response)
            throw error;
        const message: string = error.response.data.message;
        if (!message)
            throw error;
        return rejectWithValue(message);
    }
})


const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get all posts reducers
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
        builder.addCase(toggleLike.fulfilled, (state, action) => {
            state.loading = false;
            state.posts.forEach((post: post) => {
                if (post._id === action.payload.pid) {
                    if (post.likes.find(like => like._id === action.payload.user._id))
                        post.likes = post.likes.filter(like => like._id !== action.payload.user._id);
                    else {
                        post.likes.push(action.payload.user);
                    }
                }
            })
        })
    }
})

export default PostsSlice.reducer