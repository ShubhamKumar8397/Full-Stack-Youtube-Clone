import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    icons : {
        checkSvg : "./Logo/Check.svg",
        tubelogo : "./Logo/tubelogo.svg"
    }
}


const svgSlice = createSlice({
    name : "svg",
    initialState,
    reducer: {}
})


export const selectSvgIcon = (state) => state.svg.icons;
export default svgSlice.reducer