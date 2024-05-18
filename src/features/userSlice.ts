import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    },
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
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
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
