import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { setEmployeeExperience } from "../Slices/employeeService";

const EmployeeExperience = () => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

    const employeeData = {
      company,
      title,
      startDate,
      endDate,
      description,
    };

    const success = await setEmployeeExperience(dispatch, employeeData);

    if (!success) return; // stop lying to yourself

    // Reset (optional — component unmounts anyway)
    setCompany("");
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");

    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="w-screen flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg md:max-w-2xl shadow-xl rounded-2xl p-6">
          <p className="text-2xl md:text-3xl font-bold text-center">
            Enter Job Experience
          </p>

          <form className="w-full mt-6 flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Company Name"
              fullWidth
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <TextField
              size="small"
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              type="date"
              size="small"
              label="Start Date"
              fullWidth
              required
              value={startDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <TextField
              type="date"
              size="small"
              label="End Date"
              fullWidth
              required
              value={endDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <TextField
              size="small"
              label="Role Description"
              multiline
              rows={3}
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your role"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="w-full p-2 border rounded-lg"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded-lg"
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

export default EmployeeExperience;
