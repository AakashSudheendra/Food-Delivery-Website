import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name :"user",
    //used to store data like useState
    initialState:{
        userData:null,
        city:null
    },
    //used to modify data like set state in useState
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload   //action.payload contains modified changes
        },
        setCity:(state,action)=>{
            state.city=action.payload   //action.payload contains modified changes
        }

    }
})

export const {setUserData,setCity}=userSlice.actions
export default userSlice.reducer