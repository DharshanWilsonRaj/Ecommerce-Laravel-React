import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth(state, { payload }) {
            state.isLoggedIn = payload.login;
            state.token = payload.token;
        }
    }
})

export const { setAuth } = AuthSlice.actions
export default AuthSlice.reducer
