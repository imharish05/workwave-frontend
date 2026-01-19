import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setEmployerProfile } from "../Slices/employerSlice";
import { toast } from "react-toastify";

const EditJobs = () => {
  const employer = useSelector((state) => state.employer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  // Open modal for edit or add
  const openModal = (item) => {
    setCurrentId(item._id);
    setTitle(item.title);
    setType(item.type);
    setExperience(item.experience);
    setLocation(item.location);
    setSalaryRange(item.salaryRange);
    setSkills(item.skills?.join(", "));
    setDescription(item.description);
    setOpen(true);
  };

  // Save or add job
  const submitDetails = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Job title is required");
      return;
    }

    const payload = {
      title: title.trim(),
      type,
      experience,
      location: location.trim(),
      salaryRange,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description,
    };

    const request = api.put(`/job/${currentId}`, payload);

    return toast.promise(request, {
      pending: "Updating job...",
      success: {
        render({ data }) {
          dispatch(setEmployerProfile(data.data.employer));
          setOpen(false);
          return "Job updated successfully";
        },
      },
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to update job";
        },
      },
    });
  };

  // Delete job
const deleteJob = (e) => {
  e.preventDefault();

  const request = api.delete(`/job/${currentId}`);

  return toast.promise(request, {
    pending: "Deleting job...",
    success: {
      render({ data }) {
        dispatch(setEmployerProfile(data.data.employer));
        setOpen(false);
        setCurrentId(null);
        return "Job deleted successfully";
      },
    },
    error: {
      render({ data }) {
        return (
          data?.response?.data?.message || "Failed to delete job"
        );
      },
    },
  });
};

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center px-4 py-6">
        <div className="md:w-1/2 w-full">
          <div className="border-b border-gray-300 pb-4 mb-4 flex items-center gap-4">
            <i
              className="bi bi-arrow-left text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Jobs</h1>
          </div>

          {employer.jobPosted.length > 0 ? (
            employer.jobPosted.map((item) => (
              <div
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
                <i
                  className="bi bi-highlighter text-xl cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
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

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
              <TextField
                size="small"
                label="Job Title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                size="small"
                label="Location"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                select
                size="small"
                label="Salary Range"
                fullWidth
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                {["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-20 LPA", "20+ LPA"].map(
                  (s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                select
                size="small"
                label="Job Type"
                fullWidth
                value={type}
                onChange={(e) =>
                  setType(
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value
                  )
                }
                SelectProps={{ multiple: true }}
              >
                {[
                  "full-time",
                  "part-time",
                  "internship",
                  "contract",
                  "freelance",
                ].map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                size="small"
                label="Experience"
                fullWidth
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <TextField
                size="small"
                label="Skills (comma separated)"
                fullWidth
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <TextField
                size="small"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={deleteJob}
                  className="flex-1 py-2 border border-gray-300 text-red-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJobs;
