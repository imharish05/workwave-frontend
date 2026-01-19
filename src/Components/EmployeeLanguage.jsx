import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setEmployeeLanguage } from "../Slices/employeeService.js";
import MenuItem from "@mui/material/MenuItem";

const EmployeeLanguage = () => {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitDetails = async (e) => {
    e.preventDefault();

    const skills = {
      name: name.trim().toLowerCase(),
      proficiency: proficiency.toLowerCase(),
    };

    const success = await setEmployeeLanguage(dispatch, skills);

    if (success) {
      setName("");
      setProficiency("");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl p-6 md:p-20 flex flex-col">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Add Language
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
              label="Proficiency"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              fullWidth
              required
              className="text-start"
            >
              {["Beginner","Intermediate","Expert","Fluent","Native"].map(
                (s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                )
              )}
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

export default EmployeeLanguage;
