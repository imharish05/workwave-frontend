import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setEmployeeJobPreferences } from "../Slices/employeeService.js";
import MenuItem from "@mui/material/MenuItem";

const EmployeeJobPreference = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [jobType, setJobType] = useState([]);
  const [workAvailability, setWorkAvailability] = useState([]);
  const [shiftPreference, setShiftPreference] = useState([]);
  const [remote, setRemote] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

  const payload = {
  jobTitle: jobTitle.split(",").map(v => v.trim()).filter(Boolean),
  preferredLocation: preferredLocation.split(",").map(v => v.trim()).filter(Boolean),
  expectedSalary,
  jobType,
  workAvailability,
  shiftPreference,
  remote,
};

  const success = await setEmployeeJobPreferences(dispatch, payload);

    if (success) {
      setJobTitle("");
      setPreferredLocation("");
      setExpectedSalary("");
      setJobType([]);
      setWorkAvailability([]);
      setShiftPreference([]);
      setRemote("");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-screen flex justify-center items-center flex-1">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl px-20 py-10 flex flex-col">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Enter Your Job Preferences Details
          </p>

          <form className="flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Job Titles (comma separated)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              required
              className="text-start"
            />

            <TextField
              size="small"
              label="Preferred Locations (comma separated)"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              fullWidth
              className="text-start"
            />

            <TextField
              select
              size="small"
              label="Expected Salary"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              fullWidth
              required
              className="text-start"
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
              label="Remote Preference"
              value={remote}
              onChange={(e) => setRemote(e.target.value)}
              fullWidth
              className="text-start"
            >
              {["remote", "hybrid", "onsite"].map((r) => (
                <MenuItem key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Job Type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              SelectProps={{ multiple: true }}
              fullWidth
              className="text-start"
            >
              {[
                "full-time",
                "part-time",
                "internship",
                "contract",
                "freelance",
              ].map((r) => (
                <MenuItem key={r} value={r}>
                  {r.replace("-", " ")}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Work Availability"
              value={workAvailability}
              onChange={(e) => setWorkAvailability(e.target.value)}
              SelectProps={{ multiple: true }}
              fullWidth
              className="text-start"
            >
              {["monday-to-friday", "weekend-availability", "weekend-only"].map(
                (r) => (
                  <MenuItem key={r} value={r}>
                    {r.replaceAll("-", " ")}
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              select
              size="small"
              label="Shift Preference"
              value={shiftPreference}
              onChange={(e) => setShiftPreference(e.target.value)}
              SelectProps={{ multiple: true }}
              fullWidth
              className="text-start"
            >
              {[
                "day-shift",
                "morning-shift",
                "rotational-shift",
                "night-shift",
                "evening-shift",
                "fixed-shift",
                "us-shift",
                "uk-shift",
              ].map((r) => (
                <MenuItem key={r} value={r}>
                  {r.replace("-", " ")}
                </MenuItem>
              ))}
            </TextField>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="w-full p-2 bg-white text-black rounded-lg border cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded-lg cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeJobPreference;
