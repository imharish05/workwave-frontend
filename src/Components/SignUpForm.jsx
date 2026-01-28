import Logo from "../assets/Logo2.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import googleLogo from "../assets/GoogleLogo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../Slices/authServise.js";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !user?.role) {
      navigate("/set-role", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    userSignUp(dispatch, {
      userName: userName,
      email: userEmail,
      password: userPwd,
    });
  };

  const handleGoogleLogin = () => {
    const backendUrl = "https://workwave-backend-6gta.onrender.com";
    window.location.href = `${backendUrl}/api/auth/google`;
  };


  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-lg md:shadow-xl rounded-2xl p-6 flex flex-col items-center">
        <img
          src={Logo}
          alt="Logo"
          className="object-contain max-w-xs max-h-20 mb-4"
        />

        <p className="text-2xl md:text-3xl font-bold text-center">
          Create your WorkWave account
        </p>
        <p className="pt-2 text-center text-sm text-gray-600">
          Organize your work in one place.
        </p>

        {/* FORM */}
        <form
          className="w-full mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <TextField
            size="small"
            label="Enter your name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />

          <TextField
            size="small"
            label="Enter your email"
            variant="outlined"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            fullWidth
          />

          <TextField
            size="small"
            label="Enter your password"
            variant="outlined"
            type="password"
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            fullWidth
          />

          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded-lg"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 p-2 bg-white border rounded-lg flex items-center justify-center"
        >
          <img src={googleLogo} className="h-4 w-4 mr-2" alt="Google" />
          Sign Up with Google
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
