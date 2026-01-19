import { useNavigate } from "react-router-dom";
import { applyJob } from "../Slices/jobService";
import { useDispatch } from "react-redux";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white text-start">
      
      <h2 className="text-lg font-semibold capitalize">{job.title}</h2>

      {/* Meta */}
      <div className="text-sm text-gray-500 mt-1">
        {job.location} • {job.experience}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job.type.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job.skills.map((skill) => (
          <span key={skill} className="text-xs px-2 py-1 border rounded-full ">
            {skill}
          </span>
        ))}
      </div>

      {/* Salary */}
      <p className="mt-3 text-sm font-medium">💰 {job.salaryRange}</p>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/jobs/${job.jobKey}`)}
          className="flex-1 border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-100"
        >
          View Job
        </button>

        <button
          onClick={() => applyJob(dispatch, job._id)}
          className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
        <i className="bi bi-send-check px-2"></i>Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
