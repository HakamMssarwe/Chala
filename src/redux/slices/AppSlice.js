import { createSlice } from "@reduxjs/toolkit"

const AppSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn:false,
  },
  reducers: {
    setApp(state, {type,payload}) {
      state.isLoggedIn = payload.isLoggedIn;
    }
  }
})

export const { setApp } = AppSlice.actions
export default AppSlice.reducer