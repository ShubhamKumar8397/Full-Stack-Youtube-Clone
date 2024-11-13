import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../ReduxSlice/userSlice"
import svgReducer from "../ReduxSlice/svgSlice"

const store = configureStore({
    reducer: {
        user :  userReducer,
        svg : svgReducer
    }
})

export default store