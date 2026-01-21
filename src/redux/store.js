import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/Slice';
import projectReducer from './projectSlice';
export const store=configureStore({
    reducer:{
        auth:authReducer,
        projects:projectReducer,
    },
});