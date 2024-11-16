import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isAuthenticated : "",
   user : ""

}


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout : (state, action) => {
            state.isAuthenticated = false
            state.user = ""
        }
    }
})


export const {login, logout} = userSlice.actions
export default userSlice.reducer