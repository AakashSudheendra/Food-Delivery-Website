import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name :"user",
    //used to store data like useState
    initialState:{
        userData:null
    },
    //used to modify data like set state in useState
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload   //action.payload contains modified changes
        }

    }
})

export const {setUserData}=userSlice.actions
export default userSlice.reducer