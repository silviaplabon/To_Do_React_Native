import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
  textColor:"black",
  themeBgColor:"white",
  buttonBgColor:'#212729',
  drawerBgColor:'red'
}
const ThemeReducer=createSlice({
     name:"theme",
     initialState,
     reducers:{
        updateTextColor(state, action) {
            state.textColor = action.payload
        },
        updateButtonBgColor(state, action) {
            state.buttonBgColor = action.payload
        },
        updateThemeBgColor(state, action) {
            state.themeBgColor = action.payload
        },
        updateDrawerBgColor(state, action) {
            state.drawerBgColor = action.payload
        },
     },
        extraReducers: {
     }
})
export const { updateTextColor,updateButtonBgColor,updateThemeBgColor,updateDrawerBgColor } = ThemeReducer.actions
export default ThemeReducer.reducer;