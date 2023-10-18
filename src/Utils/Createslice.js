import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
   name:"user",
   initialState:{
    loginUser:null,
   },
   
   reducers:{
    
    login:(state,action)=>{
        state.loginUser = action.payload;
    },
    
   }
})


export const {login} = userSlice.actions;

export const selectUser = (state)=>state.user.loginUser;

export default userSlice.reducer;
