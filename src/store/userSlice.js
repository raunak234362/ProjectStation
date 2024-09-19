import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: false,
  userData: [],
};

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload;
      sessionStorage.setItem('token', action.payload.token); // Persist token in session storage
    },
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = false;
      state.userData = null;
      sessionStorage.removeItem('token'); // Remove token from session storage
    },
    updatetoken: (state, action) => {
      state.token = action.payload.token;
      sessionStorage.setItem('token', action.payload.token);
    }
  },
});

export const { login, setUserData, updatetoken, logout } = userSlice.actions;

export default userSlice.reducer;
