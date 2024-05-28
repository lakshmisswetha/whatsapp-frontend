import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    user: {
        status: string;
        id: string;
        name: string;
        email: string;
        picture: string;
        token: string;
    };
    error: any;
    status: string;
}

export interface RootState {
    user: UserState;
}

const AUTH_ENDPOINT = `http://localhost:8000/auth`;

const initialState: UserState = {
    user: {
        status: "",
        id: "",
        name: "",
        email: "",
        picture: "",
        token: "",
    },
    error: "",
    status: "",
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (values: Record<string, any>, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
                ...values,
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (values: Record<string, any>, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
                ...values,
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            };
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
