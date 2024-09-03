import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: false,
  userData: null,
}

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = true
      state.userData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
      logout: (state) => {
      state.token = false
      state.userData = null
    },
    updatetoken: (state, action) => {
      state.token = action.payload.token
      sessionStorage.setItem('token', action.payload.token)
    }
  },
})
export const { login, setUserData, updatetoken } = userSlice.actions

export default userSlice.reducer
