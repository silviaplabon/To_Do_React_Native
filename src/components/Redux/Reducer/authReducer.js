import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
   username:"",
   email:"",
}
const authReducer=createSlice({
     name:"user",
     initialState,
     reducers:{
        updateUsername(state, action) {
            state.username = action.payload
        },
        updateEmail(state, action) {
            state.email = action.payload
        },
     },
        extraReducers: {
     }
})
export const { updateUsername,updateEmail } = authReducer.actions
export default authReducer.reducer;