import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../ReduxSlice/userSlice"

const store = configureStore({
    reducer: {
        user :  userReducer
    }
})

export default store