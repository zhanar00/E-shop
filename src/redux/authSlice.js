import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // No user logged in initially
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // Set user info
        },
        logout: (state) => {
            state.user = null; // Clear user info
        },
    },
});

export const { updateUserInfo, resetUserInfo } = authSlice.actions;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
