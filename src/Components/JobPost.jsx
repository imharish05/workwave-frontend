import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios"; // your axios instance
import { useDispatch, useSelector } from "react-redux";
import { setEmployerProfile } from "../Slices/employerSlice";

const JobPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.employer);

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  const submitDetails = async (e) => {
    e.preventDefault();

    if (!jobTitle.trim()) {
      toast.error("Job Title is required");
      return;
    }

    const payload = {
      title: jobTitle.trim(),
      type: jobType,
      experience,
      location: location.trim(),
      salaryRange,
      skills: skills.split(",").map((s) => s.trim()),
      description,
    };

    try {
      const request = api.post("/job", payload);

      await toast.promise(request, {
        pending: "Posting job...",
        success: {
          render({ data }) {
            dispatch(setEmployerProfile(data.data.employer));
            setJobTitle("");
            setJobType([]);
            setExperience("");
            setLocation("");
            setSalaryRange("");
            setSkills("");
            setDescription("");
            return "Job posted successfully!";
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to post job";
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
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
            <h1 className="text-2xl font-bold">Post Job</h1>
          </div>

          <form className="flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Experience Required (e.g. 2-4 years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Salary Range"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              fullWidth
              required
              className="text-start"
            >
            </TextField>

            <TextField
              select
              size="small"
              label="Job Type"
              value={jobType}
              required
              className="text-start"
              onChange={(e) =>
                setJobType(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              SelectProps={{ multiple: true }}
              fullWidth
            >
              {["full-time", "part-time", "internship", "contract"].map((t) => (
                <MenuItem key={t} value={t}>
                  {t.replace("-", " ")}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              size="small"
              label="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              required
            />

            <button
              type="submit"
              className="bg-black text-white rounded-lg py-2 mt-4"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobPost;
