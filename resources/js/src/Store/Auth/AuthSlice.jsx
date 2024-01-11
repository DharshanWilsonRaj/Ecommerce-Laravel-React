import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    role_id: 2
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth(state, { payload }) {
            state.isLoggedIn = payload.login;
            state.token = payload.token;
            state.role_id = payload;
        },
        setAccess(state, { payload }) {
            state.role_id = payload;
        }
    }
})

export const { setAuth, setAccess } = AuthSlice.actions
export default AuthSlice.reducer
