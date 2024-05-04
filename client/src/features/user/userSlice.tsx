import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login, register } from "../../interfaces/user";

const initialState: { message?: string | null, loading: boolean, error?: string | null } = { message: null, loading: false, error: null }
export const clearErrors = createAction("clearErrors");
export const clearSuccess = createAction("clearSuccess");

export const loginUser = createAsyncThunk("user/login", async (userData: login, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/v1/login", {
            ...userData
        },
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

export const registerUser = createAsyncThunk("user/register", async (userData: register, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/v1/register", {
            ...userData
        },
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

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/logout",
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

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //common reducers
        builder.addCase("clearErrors", (state) => {
            state.error = null;
        })
        builder.addCase("clearSuccess", (state) => {
            state.message = null;
        })
        //login user reducers
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log("logout");
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
        //register user reducers
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log("logout");
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
        //logout user reducers
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : action.error.message;
        })
    }
})

export default UserSlice.reducer