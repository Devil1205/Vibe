import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userDetails } from "../../interfaces/user";

const initialState: { user: userDetails | {}, loading: boolean, error?: string | null } = { user: {}, loading: false, error: null }

export const fetchUser = createAsyncThunk("userDetails/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/profile",
            {
                withCredentials: true
            });
        return data;
    } catch (error) {
        const message: string = error.response.data.message;
        if (!message)
            throw error;
        return rejectWithValue(message);
    }
})

const UserDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = {};
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
    }
})

export default UserDetailsSlice.reducer