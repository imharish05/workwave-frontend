import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../Slices/authSlice";
import PreLoader from "./PreLoader";
import { toast } from "react-toastify";

const GoogleCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const isNewUser = params.get("isNewUser");
    const error = params.get("error");

    // Handle errors from backend
    if (error) {
      toast.error(
        error === "authentication_failed"
          ? "Google authentication failed. Please try again."
          : "An error occurred during login."
      );
      navigate("/login", { replace: true });
      return;
    }

    if (!token) {
      toast.error("Authentication failed - no token received");
      navigate("/login", { replace: true });
      return;
    }

    try {
      // ✅ Decode JWT - structure is { user: { id, email, role } }
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      // Store token
      localStorage.setItem("token", token);

      // ✅ FIX: Extract user object from decoded token
      const user = decoded.user;

      // Dispatch to Redux with the user object
      dispatch(loginSuccess({ token, user }));

      // ✅ FIX: Check role from user.role (not decoded.role)
      if (!user.role || isNewUser === "true") {
        toast.info("Please select your role to continue");
        navigate("/set-role", { replace: true });
      } else {
        toast.success(`Welcome back!`);
        navigate(`/${user.role}/dashboard`, { replace: true });
      }
    } catch (err) {
      console.error("Token decode error:", err);
      toast.error("Authentication failed - invalid token");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate, params]);

  return <PreLoader />;
};

export default GoogleCallBack;
