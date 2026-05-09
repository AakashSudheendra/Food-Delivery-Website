import { createSlice } from "@reduxjs/toolkit";

const ownerSlice=createSlice({
    name :"owner",
    //used to store data like useState
    initialState:{
        myShopData:null,
    },
    //used to modify data like set state in useState
    reducers:{
        setMyShopData:(state,action)=>{
            state.myShopData=action.payload   //action.payload contains modified changes
        },

    }
})

export const {setMyShopData}=ownerSlice.actions
export default ownerSlice.reducer