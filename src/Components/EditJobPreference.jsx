import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setJobPreferences } from "../Slices/employeeSlice";

const EditJobPreference = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [jobTitle, setJobTitle] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [jobType, setJobType] = useState([]);
  const [workAvailability, setWorkAvailability] = useState([]);
  const [shiftPreference, setShiftPreference] = useState([]);
  const [remote, setRemote] = useState("");

  /* Prevent background scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  /* Open modal */
  const openModal = (item) => {
    setCurrentId(item._id);
    setJobTitle(item.jobTitle?.join(", ") || "");
    setPreferredLocation(item.preferredLocation?.join(", ") || "");
    setExpectedSalary(item.expectedSalary || "");
    setJobType(item.jobType || []);
    setWorkAvailability(item.workAvailability || []);
    setShiftPreference(item.shiftPreference || []);
    setRemote(item.remote || "");
    setOpen(true);
  };

  /* Update job preference */
  const submitDetails = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    const payload = {
      jobTitle: jobTitle.split(",").map((v) => v.trim()),
      preferredLocation: preferredLocation.split(",").map((v) => v.trim()),
      expectedSalary,
      jobType,
      workAvailability,
      shiftPreference,
      remote,
    };

    const res = await api.put(
      `/employee/job-preferences/${currentId}`,
      payload
    );

  
    dispatch(setJobPreferences(res.data.jobPreference));
    setOpen(false);
  };

  /* Delete */
  const deleteJobPreference = async () => {
    const res = await api.delete(`/employee/job-preferences/${currentId}`);

    console.log(res.data)

    dispatch(setJobPreferences(res.data.jobPreference));
    setOpen(false);
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
            <h1 className="text-2xl font-bold">Job Preferences</h1>
          </div>

          {employee.jobPreferences?.length > 0 ? (
            employee.jobPreferences.map((item) => (
              <div
                key={item._id}
                className="flex justify-between py-4 border-b border-gray-300 font-semibold"
              >
                <p>{item.jobTitle.join(", ")}</p>
                <i
                  className="bi bi-highlighter cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <p className="font-semibold py-3 text-gray-600">
              You haven’t added any job preferences yet
            </p>
          )}

          {(!employee.jobPreferences ||
            employee.jobPreferences.length === 0) && (
            <Link
              to="/employee/job-preferences"
              className="flex justify-between py-4 font-semibold"
            >
              <p className="text-blue-600">Add Job Preference</p>
              <i className="bi bi-plus-lg" />
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto xl:mt-4">
          <div className="bg-white rounded-lg p-3 w-[90%] md:w-[420px] my-10">
            <h2 className="text-xl font-bold mb-4">Edit Job Preferences</h2>

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
                {[
                  "monday-to-friday",
                  "weekend-availability",
                  "weekend-only",
                ].map((r) => (
                  <MenuItem key={r} value={r}>
                    {r.replaceAll("-", " ")}
                  </MenuItem>
                ))}
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

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={deleteJobPreference}
                  className="flex-1 border text-red-600 rounded-lg py-2"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border rounded-lg py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-black text-white rounded-lg py-2"
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

export default EditJobPreference;
