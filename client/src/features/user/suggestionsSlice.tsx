import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "../../interfaces/post";

const initialState: { followUsers: user[] | [], loading: boolean, error?: string | null } = { followUsers: [], loading: false, error: null };

export const getFollowSuggestions = createAsyncThunk("followSuggestions/getSuggestions", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/follow/suggestions",
            {
                withCredentials: true
            });
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

const SuggestionsSlice = createSlice({
    name: "followSuggestions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //common reducers
        builder.addCase("clearErrors", (state) => {
            state.error = null;
        })
        //follow suggestions reducers
        builder.addCase(getFollowSuggestions.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFollowSuggestions.fulfilled, (state, action) => {
            state.loading = false;
            state.followUsers = action.payload.user;
        })
        builder.addCase(getFollowSuggestions.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
    }
})

export default SuggestionsSlice.reducer