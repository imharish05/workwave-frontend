import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../Slices/authSlice";
import PreLoader from "./PreLoader";

const GoogleCallBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");


    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);

      console.log(decoded)

      localStorage.setItem("token", token);

      dispatch(loginSuccess({ token, user: decoded }));

      console.log(decoded);
      

      if (!decoded.role) {
        navigate("/set-role", { replace: true });
      } else {
        navigate(`/${decoded.role}`, { replace: true });
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, []);

  return <PreLoader />;
};

export default GoogleCallBack;
