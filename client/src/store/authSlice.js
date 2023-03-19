import { createSlice } from '@reduxjs/toolkit'
import { authApiSlice } from './api/authApiSlice'

const initialState = {
    loading: false,
    error: null,
    userId: null,
    email: null,
    username: null,
    userRole: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.email = payload.user.email;
            state.userId = payload.user._id;
            state.username = payload.user.username;
            state.userRole = payload.user.role;
        });
        builder.addMatcher(authApiSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.email = payload.user.email;
            state.userId = payload.user._id;
            state.username = payload.user.username;
            state.userRole = payload.user.role;
        });
        builder.addMatcher(authApiSlice.endpoints.creatorLogin.matchFulfilled, (state, { payload }) => {
            state.email = payload.user.email;
            state.userId = payload.user._id;
            state.username = payload.user.username;
            state.userRole = payload.user.role;
        });
        builder.addMatcher(authApiSlice.endpoints.creatorRegister.matchFulfilled, (state, { payload }) => {
            state.email = payload.user.email;
            state.userId = payload.user._id;
            state.username = payload.user.username;
            state.userRole = payload.user.role;
        });
        builder.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state, { payload }) => {
            state.email = null;
            state.userId = null;
            state.username = null;
            state.userRole = null;
        });
    }
});



export default authSlice.reducer;
