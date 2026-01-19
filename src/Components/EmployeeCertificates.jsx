import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { setEmployeeCertificates } from "../Slices/employeeService.js";

/* Convert month input → Date */
const monthToDate = (month) =>
  month ? new Date(`${month}-01`) : null;

const EmployeeCertificates = () => {
  const [name, setName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const certificate = {
      name: name.trim(),
      expireYear: monthToDate(expiryMonth),
    };

    const success = await setEmployeeCertificates(dispatch, certificate);

    if (success) {
      setName("");
      setExpiryMonth("");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="w-screen flex justify-center items-center flex-1">
        <div className="w-full max-w-lg md:max-w-2xl md:shadow-xl rounded-2xl p-6 md:p-20 flex flex-col">
          <p className="text-2xl md:text-3xl font-bold text-center pb-6">
            Add Certification
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={submitDetails}>
            <TextField
              size="small"
              label="Certificate Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              type="month"
              size="small"
              label="Expiration Month"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
            />

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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCertificates;
