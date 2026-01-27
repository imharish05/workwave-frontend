import { combineReducers } from "@reduxjs/toolkit";
import auth from "../Slices/authSlice";
import employee from "../Slices/employeeSlice";
import employer from "../Slices/employerSlice";
import job from "../Slices/jobSlice";

const appReducer = combineReducers({
  auth,
  employee,
  employer,
  job,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logOut") {
    state = undefined; // 💣 TOTAL RESET
  }
  return appReducer(state, action);
};

export default rootReducer;
