import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployerJobApplicants = () => {
  const employer = useSelector((state) => state.employer);

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
            <h1 className="text-2xl font-bold">Posted Jobs</h1>
          </div>

          {employer.jobPosted.length > 0 ? (
            employer.jobPosted.map((item) => (
              <Link
                to={`/view-applicants/${item.jobKey}`}
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
                  <p className="text-sm text-gray-600 text-start">
                    Applicants:{" "}
                    <span className="font-medium text-gray-800">
                      {item.applicants.length}
                    </span>
                  </p>
                </div>
                <i className="bi bi-arrow-up-right-circle-fill"></i>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 py-3 font-semibold">
              No jobs posted yet
            </p>
          )}

          <Link
            to={"/employer/post-job"}
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500 font-semibold py-3 text-md">
              Add Another Job
            </p>
            <i className="bi bi-plus-lg text-xl cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobApplicants;
