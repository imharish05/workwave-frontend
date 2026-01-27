import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import notFoundImg from "../assets/notfound.png";

const NotFound = () => {
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.user?.role);

  const handleNavigation = () => {
    if (role === "employee") navigate("/employee/dashboard");
    else if (role === "employer") navigate("/employer/dashboard");
    else navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-5">
        <img
          src={notFoundImg}
          alt="404 Not Found"
          className="w-80 mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-600 mb-5">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={handleNavigation}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          {role === "employer"
            ? "Go to Employer Dashboard"
            : role === "employee"
            ? "Go to Employee Dashboard"
            : "Go Home"}
        </button>
      </div>
    </>
  );
};

export default NotFound;
