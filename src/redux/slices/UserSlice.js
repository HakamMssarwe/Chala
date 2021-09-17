import { createSlice } from "@reduxjs/toolkit"

const UserSlice = createSlice({
  name: "user",
  initialState: {
    username:""  },
  reducers: {
    setUser(state, {type,payload}) {
      state.username = payload.username;
    }
  }
})

export const { setUser } = UserSlice.actions
export default UserSlice.reducer