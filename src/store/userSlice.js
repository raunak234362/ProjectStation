import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
}

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload
      if (!username || !password) {
        state.userData = {}
      } else {
        state.userData = {
          username,
          ...state.userData,
        }
      }
    },
  },
  setUserData: (state, action) => {
    state.userData = { ...action.payload }
  },
})
export const { login, setUserData } = userSlice.actions

export default userSlice.reducer
