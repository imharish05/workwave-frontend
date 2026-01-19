import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const { appliedJobs } = useSelector((state) => state.employee);

  console.log(appliedJobs);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="md:w-1/2 w-full">
          <div className="border-b border-gray-300 pb-4 mb-4 flex items-center gap-4">
            <i
              className="bi bi-arrow-left text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Jobs</h1>
          </div>

          {appliedJobs.length > 0 ? (
            appliedJobs.map((item) => (
              <Link
                to={`/jobs/${item.jobKey}`}
                key={item._id}
                className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-start">
                    {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                  </p>
                  <p className="text-gray-500 text-sm text-start">
                    {item.type.join(", ")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 py-3 font-semibold">Apply to job's</p>
          )}

          <Link
            to={"/employee/all-jobs"}
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500 font-semibold py-3 text-md">
              Apply to Another Job
            </p>
            <i className="bi bi-plus-lg text-xl cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
