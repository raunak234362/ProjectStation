import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  userData: null,
}

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload
    },
  },
  logout: (state)=>{
    state.status = false
    state.userData = null
  },
  setUserData: (state, action) => {
    state.userData = action.payload
  },
})
export const { login, setUserData } = userSlice.actions

export default userSlice.reducer
