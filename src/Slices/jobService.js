// jobService.js
// jobService.js
import { toast } from "react-toastify";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import {
  fetchAllJobsFailure,
  fetchAllJobsStart,
  fetchAllJobsSuccess,
} from "./jobSlice";
import { fetchAppliedJobs } from "./employeeService";

const FETCH_JOBS_TOAST_ID = "fetch-jobs";

export const fetchAllJobs = async (dispatch) => {
  try {
    dispatch(fetchAllJobsStart());

    const request = api.get("/job/all-jobs");

    await toast.promise(
      request,
      {
        pending: "Fetching jobs...", // just a string, no dispatch here
        success: {
          render({ data }) {
            dispatch(fetchAllJobsSuccess(data.data));
            return "Jobs fetched successfully";
          },
        },
        error: {
          render({ data }) {
            const msg = data?.response?.data?.message || "Failed to fetch jobs";
            dispatch(fetchAllJobsFailure(msg));
            return msg;
          },
        },
      },
      { toastId: FETCH_JOBS_TOAST_ID },
    );
  } catch (err) {
    console.log(err.message);
  }
};

/* Apply for a job */
export const applyJob = async (dispatch, jobId) => {
  try {
    await toast.promise(
      api.post(`/job/apply/${jobId}`),
      {
        pending: "Applying to job...",
        success: "Applied successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to apply";
          },
        },
      },
      { toastId: `apply-job-${jobId}` }
    );

    // refresh applied jobs after success
    fetchAppliedJobs(dispatch);

  } catch (err) {
    console.error(err.message);
  }
};
