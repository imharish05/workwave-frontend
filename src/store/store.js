import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../Slices/authSlice.js"
import employeeSlice from "../Slices/employeeSlice.js"
import employerSlice from "../Slices/employerSlice.js"
import jobSlice from "../Slices/jobSlice.js"
import rootReducer from "../Slices/rootReducer.js"


export const store = configureStore({
    reducer : {
        auth : authSlice,
        employee : employeeSlice,
        employer : employerSlice,
        job : jobSlice,
        reducer: rootReducer,
    }
})