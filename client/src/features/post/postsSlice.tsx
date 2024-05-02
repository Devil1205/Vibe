import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../interfaces/post";
import axios from "axios";

const initialState: { posts: post | [], loading: boolean, error?: string | null } = { posts: [], loading: false, error: null }

export const getAllPosts = createAsyncThunk("posts/allPosts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/posts/all");
        return data;
    } catch (error) {
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
    }
})

export default PostsSlice.reducer