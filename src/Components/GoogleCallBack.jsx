import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../Slices/authSlice";
import PreLoader from "./PreLoader";
import { toast } from "react-toastify";

const GoogleCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // ✅ HashRouter-safe param extraction
      const hash = window.location.hash; 
      const queryString = hash.split("?")[1];

      if (!queryString) {
        toast.error("Authentication failed");
        return navigate("/login", { replace: true });
      }

      const params = new URLSearchParams(queryString);

      const token = params.get("token");
      const hasRole = params.get("hasRole") === "true";
      const error = params.get("error");

      if (error) {
        toast.error(
          error === "authentication_failed"
            ? "Google authentication failed"
            : "Login error"
        );
        return navigate("/login", { replace: true });
      }

      if (!token) {
        toast.error("No token received");
        return navigate("/login", { replace: true });
      }

      // ✅ Decode token
      const decoded = jwtDecode(token);
      const user = decoded.user;

      // Save token
      localStorage.setItem("token", token);

      // Update Redux
      dispatch(loginSuccess({ token, user }));

      // Redirect
      if (!hasRole || !user.role) {
        toast.info("Please select your role");
        navigate("/set-role", { replace: true });
      } else {
        toast.success("Welcome back!");
        navigate(`/${user.role}/dashboard`, { replace: true });
      }
    } catch (err) {
      console.error("Google callback error:", err);
      toast.error("Invalid authentication");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  return <PreLoader />;
};

export default GoogleCallBack;
