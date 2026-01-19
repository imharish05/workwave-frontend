import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../Slices/jobService";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../api/axios";

const JobDetails = () => {
  const { jobKey } = useParams();
  const { allJobs } = useSelector((state) => state.job);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingJob = allJobs.find((j) => j.jobKey === jobKey);

    if (existingJob) {
      setJob(existingJob);
      setLoading(false);
      return;
    }

    api
      .get(`/job/${jobKey}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch(() => {
        setJob(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobKey, allJobs]);

  if (loading)
    return (
      <>
        <Navbar></Navbar>
        <p className="p-4">Loading job...</p>
      </>
    );

  if (!job) return;

  return (
    <>
      <Navbar />
      {job ? (
        <div className="max-w-3xl mx-auto px-4 py-6 text-start">
          <div className="border-b border-b-gray-400 pb-4 flex items-center gap-4">
            <i
              className="bi bi-arrow-left text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Job Details</h1>
          </div>
          <div className="border-b border-b-gray-400 py-4">
            <h1 className="text-2xl font-bold capitalize py-2">{job.title}</h1>
            <a
              href={job.employerId?.website}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 mt-1 block underline underline-offset-4 py-2"
            >
              {job.employerId?.companyName}
              <i className="bi bi-pencil-square ps-2"></i>
            </a>
            <p className="text-gray-500 mt-1">
              {job.location.charAt(0).toUpperCase() + job.location.slice(1)} •{" "}
              {job.experience}
            </p>
          </div>

          <div className="py-2 group">
            <h1 className="text-lg font-bold">Profile Insights</h1>

            <div className="py-3">
              <p className="font-semibold pt-3 flex items-center gap-2">
                <i
                  className="
      bi bi-gear-wide-connected
      inline-block
      transition-transform duration-300
      origin-center
      group-hover:rotate-180
    "
                ></i>
                Skills
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-2 py-1 bg-gray-100 rounded-full capitalize"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="py-3">
            <p className="font-semibold py-3 flex items-center gap-2">
              <i className="bi bi-suitcase-lg inline-block"></i>
              Job Details
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {job.type.map((t) => (
                <span
                  key={t}
                  className="text-sm px-2 py-1 bg-gray-100 rounded-full capitalize"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="py-3">
            <p className="font-semibold py-3 flex items-center gap-2">
              <i className="bi bi-wallet2"></i>
              Pay
            </p>

            <span className="text-sm px-2 py-1 capitalize text-gray-600">
              Salary:{job.salaryRange}
            </span>
          </div>

          <div className="py-3">
            <p className="font-semibold py-3 flex items-center gap-2">
              <i className="bi bi-calendar-check"></i>
              Experience
            </p>

            <span className="text-sm px-2 py-1 capitalize text-gray-600">
              Experience Required: {job.experience}
            </span>
          </div>

          <div className="py-3">
            <p className="font-semibold py-3 flex items-center gap-2">
              <i class="bi bi-book"></i>
              Job Description
            </p>

            <span className="text-sm px-2 py-1 capitalize text-gray-600">
              {job.description}
            </span>
          </div>
          <div className="py-3">
            <p className="font-semibold py-3 flex items-center gap-2">
              <i class="bi bi-geo-fill"></i>Location
            </p>

            <div className="mt-1 text-sm text-gray-600 leading-relaxed px-2">
              <p>
                {job.employerId.location.street}, {job.employerId.location.area}
              </p>
              <p>{job.employerId.location.cityState}</p>
              <p>
                {job.employerId.location.country} – {job.employerId.location.pincode}
              </p>
            </div>
          </div>
          <div className="mt-6">
  <button
    type="button"
    className="
      px-6 py-2
      bg-black text-white
      text-sm font-semibold
      rounded-md
      hover:bg-gray-800
      transition-colors
    "
    onClick={() => applyJob(dispatch, job._id)}
  ><i className="bi bi-send-check px-2"></i>
    Apply
  </button>
</div>

        </div>
      ) : (
        <p className="p-4">Job not found</p>
      )}
    </>
  );
};

export default JobDetails;
