import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  authReady: false,
  error: null,
  roleChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authRestore: (state) => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token) {
        state.authReady = true;
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          state.authReady = true;
          return;
        }
        state.user = decoded.user;
        state.token = token;
        state.role = decoded.user.role;
        state.isAuthenticated = true;
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }

      state.authReady = true;
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    changeRole: (state) => {
      state.roleChange = true;
    },
    loginStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("token");
    },
    
    logOut: (state, action) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export default authSlice.reducer;
export const {
  authRestore,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  setRole,
  changeRole,
} = authSlice.actions;
