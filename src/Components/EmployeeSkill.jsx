import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setEmployeeSkill } from "../Slices/employeeService.js";
import { setSkill } from "../Slices/employeeSlice.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const EmployeeSkill = () => {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitDetails = async (e) => {
    e.preventDefault();

    const skills = {
      name: name.trim().toLowerCase(),
      experience,
    };

    const success = await setEmployeeSkill(dispatch, skills);

    if (success) {
      setName("");
      setExperience("");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl p-6 md:p-20 flex flex-col">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Add Skill
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              select
              size="small"
              label="Experience"
              variant="outlined"
              fullWidth
              value={experience}
              className="text-start"
              onChange={(e) => setExperience(e.target.value)}
            >
              {Array.from({ length: 99 }, (_, i) => i + 1).map((year) => (
                <MenuItem
                  key={year}
                  value={`${year} ${year === 1 ? "Year" : "Years"}`}
                >
                  {year} {year === 1 ? "Year" : "Years"}
                </MenuItem>
              ))}
            </TextField>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="w-full p-2 bg-white text-black rounded-lg border"
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

export default EmployeeSkill;
