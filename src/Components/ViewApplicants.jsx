import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmployerProfile } from "../Slices/employerSlice";
import api from "../api/axios";

const ViewApplicants = () => {
  const { jobkey } = useParams();

  const navigate = useNavigate();

  const { jobPosted } = useSelector((state) => state.employer);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const existingJob = jobPosted.find((job) => job.jobKey === jobkey);

    if (existingJob) {
      setJob(existingJob);
      setLoading(false);
      return;
    }

    api
      .get(`/job/${jobkey}`)
      .then((res) => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [jobkey, jobPosted]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="md:w-1/2 w-full">
          <div className="border-b border-gray-300 pb-4 flex items-center gap-4">
            <i
              className="bi bi-arrow-left text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Applicants</h1>
          </div>

          {job ? (
            <div>
              <div className="space-y-1 flex flex-col py-4 items-start border-b border-gray-300">
                <p className="font-semibold text-lg text-gray-900">
                  {job.title.charAt(0).toUpperCase() + job.title.slice(1)}
                </p>

                <p className="text-md text-gray-500 text-start">
                  {job.location}
                </p>
              </div>

              <div>
                <p className="font-semibold text-start text-lg text-gray-900 py-3">
                  <i className="bi bi-person pe-2"></i>Applicants
                </p>

                {job.applicants.length > 0 ? (
                  job.applicants.map((item, index) => (
                    <Link
                      to={`/applicant-details/${job.jobKey}/${item.authId._id}`}
                      key={item.authId._id}
                      className="flex justify-between items-center py-2"
                    >
                      <p>
                        {index + 1}.{" "}
                        {item.userName.charAt(0).toUpperCase() +
                          item.userName.slice(1)}
                      </p>
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Link>
                  ))
                ) : (
                  <p className="text-start">No Applicants Yet</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 py-3 font-medium">
              <i className="bi bi-arrow-up-right-circle-fill text-xl text-gray-600" />
              Job information not found
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

export default ViewApplicants;
