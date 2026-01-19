import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../Slices/employeeService";

const EmployeeResume = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const extension = file.name.split(".").pop().toLowerCase();
  const allowedExtensions = ["pdf", "doc", "docx"];

  if (
    !allowedMimeTypes.includes(file.type) ||
    !allowedExtensions.includes(extension)
  ) {
    setError("Only PDF, DOC, or DOCX files are allowed");
    e.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("File must be under 5MB");
    return;
  }

  setError("");
  setResumeFile(file);
};

const submitDetails = async (e) => {
  e.preventDefault();

  if (!resumeFile) {
    setError("Please upload your resume");
    return;
  }

  const formData = new FormData();
  formData.append("resume", resumeFile);


  await uploadResume(dispatch, formData);
};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="w-screen flex-1 flex justify-center items-center">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl p-6 md:p-20">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Upload Your Resume
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              type="file"
              inputProps={{ accept: ".pdf,.doc,.docx" }}
              onChange={handleFileChange}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full p-2 bg-black text-white rounded-lg"
            >
              Upload & Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeResume;
