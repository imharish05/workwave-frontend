import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Overview = ({ employee }) => {
  const email = useSelector((state) => state.auth.user.email);
  console.log(employee);

  if (!employee?.userName) return null;

  const nameParts = employee.userName.trim().split(/\s+/);
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
  const secondInitial = nameParts[1]?.[0]?.toUpperCase() || "";

  const [showResume, setShowResume] = useState(false);

  return (
    <>
    <Navbar></Navbar>
    <div className="w-full flex items-center justify-center">
      <div className="md:w-[50%] w-100 md:p-4">
        {/* {Avatar} */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="md:text-3xl text-xl font-bold">
              {employee.userName.toUpperCase()}
            </h1>
          </div>
          <div className="w-15 h-15 md:w-25 md:h-25 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-semibold">
            {firstInitial}
            {secondInitial}
          </div>
        </div>

        <div className="text-start py-5">
          <p className="py-2 font-semibold">
            <i className="bi bi-envelope-paper px-2 font-semibold"></i> {email}
          </p>
          <p className="py-2 font-semibold">
            <i className="bi bi-telephone px-2"></i> {employee.phone}
          </p>
          <p className="py-2 font-semibold">
            <i className="bi bi-geo-alt px-2"></i> {employee.location.cityState}
            ,{employee.location.country}
          </p>
        </div>

        <div>
          <h1 className="text-start md:text-2xl text-lg font-semibold">
            Resume
          </h1>
          <div className="py-5">
            <div className="flex">
              <i className="bi bi-filetype-pdf text-5xl text-blue-600"></i>
              <div className="text-start">
                <p className="text-md text-gray-600 ps-4">
                  {employee.resume?.split("/").pop()}
                </p>
                <button
                  onClick={() => {
                    window.open(employee.resume, "_blank");
                  }}
                  className="ms-4 cursor-pointer hover:text-blue-500"
                >
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3">
          <h1 className="text-start md:text-2xl text-lg font-semibold">
            Education
          </h1>

          <div className="py-5">
            <div className="flex">
              <i className="bi bi-journal text-5xl text-blue-600"></i>
              <div className="text-start">
                <p className="text-md text-gray-600 ps-4">
                  {employee.education.map((items) => items.degree.toUpperCase())}
                </p>
                <p className="text-md text-gray-600 ps-4">{employee.education.map((items) => items.course.toUpperCase())}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Overview;
