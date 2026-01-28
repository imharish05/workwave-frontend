import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo2.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/GoogleLogo.png";
import { userLogin } from "../Slices/authServise";
import { useDispatch, useSelector } from "react-redux";
import { roleRedirect } from "../utils/RoleChange.jsx";

const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(roleRedirect(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const login = (e) => {
    e.preventDefault();
    userLogin(dispatch, {
      email: loginEmail,
      password: loginPwd,
    });
  };

  const handleGoogleLogin = () => {
    const backendUrl = "https://workwave-backend-6gta.onrender.com";
    window.location.href = `${backendUrl}/api/auth/google`;
  };


  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      {/* CARD */}
      <div className="w-full max-w-md md:max-w-lg md:shadow-xl rounded-2xl p-6 flex flex-col items-center">
        <img
          src={Logo}
          alt="Logo"
          className="object-contain max-w-xs max-h-20 mb-4"
        />

        <p className="text-2xl md:text-3xl font-bold text-center">
          Welcome Back
        </p>
        <p className="pt-2 text-center text-sm text-gray-600">
          Access your workspace and stay in flow.
        </p>

        {/* FORM */}
        <form
          onSubmit={login}
          className="w-full mt-6 flex flex-col gap-4"
        >
          <TextField
            size="small"
            label="Enter your email"
            variant="outlined"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            fullWidth
          />

          <TextField
            size="small"
            label="Enter your password"
            variant="outlined"
            type="password"
            value={loginPwd}
            onChange={(e) => setLoginPwd(e.target.value)}
            fullWidth
          />

          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 p-2 bg-white border rounded-lg flex items-center justify-center"
        >
          <img src={googleLogo} className="h-4 w-4 mr-2" alt="Google" />
          Sign in with Google
        </button>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/sign" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
