import {createSlice} from '@reduxjs/toolkit';
const authSlice=createSlice({
    name:'auth',
    initialState:{
        users:[],
        loggedInUser:null,
    },
    reducers:{
        registerUser:(state,action)=>{
            state.users.push(action.payload);
        },
        loginUser:(state,action)=>{
            const user=state.users.find(
                u=>
                    u.email===action.payload.email &&
                u.password===action.payload.password
            );
            state.loggedInUser=user || null;
        },
        logout:state=>{
            state.loggedInUser=null;
        },
    },
});
export const {registerUser,loginUser,logout} = authSlice.actions;
export default authSlice.reducer;