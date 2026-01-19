import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setEmployeeEducation } from "../Slices/employeeService.js";

const EmployeeEducation = () => {
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {education} = useSelector((state) => state.employee)

  console.log(education)
 
  const submitDetails = async (e) => {
    e.preventDefault();

    const education = {
      degree: degree.trim(),
      course: course.trim(),
    };

    if (!education.degree || !education.course) return;

    const success = await setEmployeeEducation(dispatch, education);

    if (success) {
      setDegree("");
      setCourse("");
      if(education.length > 0 ){
        navigate(-1)
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="w-screen flex justify-center items-center flex-1">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl p-6 md:p-20 flex flex-col">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Enter Your Education Details
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Degree"
              variant="outlined"
              fullWidth
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />

            <TextField
              size="small"
              label="Course"
              variant="outlined"
              fullWidth
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

            <div className="flex gap-4 pt-4">

              {education.length > 0 && 
              <button
                type="button"
                className="w-full p-2 bg-white text-black rounded-lg border"
                onClick={() => navigate(-1)}
              >
                Back
              </button>}
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

export default EmployeeEducation;
