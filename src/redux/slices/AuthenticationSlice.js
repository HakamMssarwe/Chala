import { createSlice } from "@reduxjs/toolkit"

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    jwt:"",
    userId:""
  },
  reducers: {
    setAuthentication(state, {type,payload}) {
      state.jwt = payload.jwt;
      state.userId = payload.userId;
    }
  }
})

export const { setAuthentication } = AuthenticationSlice.actions
export default AuthenticationSlice.reducer