import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed : (state,action) => action.payload,
        removeFeed:(state,action) => {
            const newfeed = state.filter(User=> User._id !== action.payload);
            return newfeed
        }
    }
});
 export const {addFeed,removeFeed} = feedSlice.actions
export default feedSlice.reducer