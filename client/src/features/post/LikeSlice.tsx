import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "../../interfaces/post";

const initialState: { message?: string | null, loading: boolean, error?: string | null } = { message: null, loading: false, error: null }

export const toggleLike = createAsyncThunk("likes/toggleLike", async ({ pid, user }: { pid: string, user: user }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/post/${pid}/like`,
            { withCredentials: true }
        );
        return { data, pid, user };
    } catch (error) {
        if (!error.response)
            throw error;
        const message: string = error.response.data.message;
        if (!message)
            throw error;
        return rejectWithValue(message);
    }
})

const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //toggle like reducers
        builder.addCase(toggleLike.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(toggleLike.fulfilled, (state, action) => {
            state.message = action.payload.data.message;
            state.loading = false;
        })
        builder.addCase(toggleLike.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
    }
})

export default LikeSlice.reducer