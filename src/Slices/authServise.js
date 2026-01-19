import { jwtDecode } from "jwt-decode";
import api from "../api/axios.js";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  setRole,
} from "./authSlice.js";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

export const userSignUp = async (dispatch, credentials) => {
  try {
    dispatch(loginStart());

    const res = await api.post("/auth/register", credentials);

    const token = res.data.token;

    if (!token) throw new Error("Token Missing");

    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);

    dispatch(loginSuccess({ token, user: decoded.user }));
  } catch (err) {
    const message = err.response?.data?.message || "Signup failed";
    dispatch(loginFailure(message));
  }
};

export const userLogin = async (dispatch, credentials) => {
  try {
    dispatch(loginStart());

    const res = await api.post("/auth/login", credentials);
    
    const token = res.data.token;

    if (!token) throw new Error("Token missing");

    const decoded = jwtDecode(token);

    dispatch(loginSuccess({ token, user: decoded.user }));
  } catch (err) {
    const message = err.response?.data?.message || "Login failed";

    dispatch(loginFailure(message));
  }
};

export const roleSelect = async (dispatch, role) => {
  try {
    const resPromise = api.post("/auth/role", { role });

    toast.promise(resPromise, {
      pending: "Setting role...",
      success: "Role set successfully",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Something went wrong";
        },
      },
    });

    const res = await resPromise;

    const token = res.data.token;

    if (!token) throw new Error("Token missing");

    const decoded = jwtDecode(token);

    dispatch(
      loginSuccess({
        user: decoded.user,
        token,
      })
    );

    dispatch(setRole(decoded.user.role));
  } catch (err) {
    console.error(err);
  }
};
