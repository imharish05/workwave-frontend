import React from "react";
import Logo from "../assets/Logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeRole } from "../Slices/authSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleRole = () => {
    dispatch(changeRole());
    console.log("Its working");
    navigate("/set-role");
  };

  const handleProfile = () => {
    dispatch(changeRole());

    switch (role) {
      case "employee":
        navigate("/employee/dashboard");
        break;
      case "employer":
        navigate("/employer/dashboard");
        break;
    }
  };

  return (
    <div className="shadow-sm flex justify-between w-screen sticky top-0 bg-white z-100">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-35 md:w-50 h-auto max-h-25"
      />
      <div className="flex items-center justify-around ">
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
