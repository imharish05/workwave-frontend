import React from "react";
import Logo from "../assets/Logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeRole } from "../Slices/authSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.user?.role);

  const handleRole = () => {
    dispatch(changeRole());
    navigate("/set-role");
  };

  const handleProfile = () => {
    dispatch(changeRole());

    if (role === "employee") navigate("/employee/dashboard");
    else if (role === "employer") navigate("/employer/dashboard");
  };


  return (
    <div className="shadow-sm flex justify-between w-screen sticky top-0 bg-white z-100">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-35 md:w-50 h-auto max-h-25 cursor-pointer"
        onClick={() =>
          navigate(
            role === "employee" ? "/employee/all-jobs" : "/employer/applicants",
          )
        }
      />

      <div className="flex items-center justify-around">
        <div className="icon h-full hover:bg-gray-300">
          {role === "employee" ? (
            <Link to="/employee/all-jobs">
              <i className="bi bi-inbox md:text-2xl text-lg  flex items-center justify-around md:px-8 px-6 h-full"></i>
            </Link>
          ) : (
            <Link to="/employer/applicants">
              <i className="bi bi-window-stack md:text-2xl text-lg  flex items-center justify-around md:px-8 px-6 h-full"></i>
            </Link>
          )}
        </div>
        <div className="icon h-full hover:bg-gray-300">
          <i
            className="bi bi-person md:text-2xl text-lg flex items-center justify-around md:px-8 px-6 h-full"
            onClick={() => handleProfile()}
          ></i>
        </div>
        <div className="icon h-full hover:bg-gray-300">
          <i
            className="bi bi-toggles md:text-xl text-lg flex items-center justify-around md:px-8 px-6 h-full"
            onClick={() => handleRole()}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
