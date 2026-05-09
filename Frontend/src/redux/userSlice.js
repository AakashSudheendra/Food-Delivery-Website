import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  //used to store data like useState
  initialState: {
    userData: null,
    city: null,
    state: null,
    address:null,
  },
  //used to modify data like set state in useState
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; //action.payload contains modified changes
    },
    setCity: (state, action) => {
      state.city = action.payload; //action.payload contains modified changes
    },
    setState: (state, action) => {
      state.state = action.payload; //action.payload contains modified changes
    },
    setAddress: (state, action) => {
      state.address = action.payload; //action.payload contains modified changes
    },
  },
});

export const { setUserData, setCity,setState,setAddress } = userSlice.actions;
export default userSlice.reducer;
