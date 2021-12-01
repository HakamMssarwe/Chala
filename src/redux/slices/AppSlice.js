import { createSlice } from "@reduxjs/toolkit"

const AppSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn:false,
    isLoading:false
  },
  reducers: {
    setApp(state, {type,payload}) {
      if (payload.isLoggedIn != null)
      state.isLoggedIn = payload.isLoggedIn;

      if (payload.isLoading != null)
      state.isLoading = payload.isLoading;

    }
  }
})

export const { setApp } = AppSlice.actions
export default AppSlice.reducer