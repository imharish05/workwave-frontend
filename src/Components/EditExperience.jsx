import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setExperience } from "../Slices/employeeSlice";


const EditExperience = () => {

  const formatForInput = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  /* Open modal and preload data */
  const openModal = (item) => {
    setCurrentId(item._id);
    setCompany(item.company || "");
    setTitle(item.title || "");
    setStartDate(formatForInput(item.startDate));
    setEndDate(formatForInput(item.endDate));
    setDescription(item.description || "");
    setOpen(true);
  };

  /* Update experience */
  const submitDetails = async (e) => {
    e.preventDefault();

    if (!company.trim() || !title.trim() || !description.trim()) return;

    const res = await api.put(`/employee/experience/${currentId}`, {
      company,
      title,
      startDate,
      endDate,
      description,
    });

    dispatch(setExperience(res.data.experience));
    setOpen(false);
  };

  
  const deleteExperience = async () => {

    const res = await api.delete(`/employee/experience/${currentId}`);

    dispatch(setExperience(res.data.experience));

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
            <h1 className="text-2xl font-bold">Experience</h1>
          </div>

          {employee.experience?.length > 0 ? (
            employee.experience.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
              >
                <p>
                  {item.company?.toUpperCase()} — {item.title}
                </p>
                <i
                  className="bi bi-highlighter text-xl cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <p className="font-semibold py-3">
              No experience information available
            </p>
          )}

          <Link
            to="/employee/experience"
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500">Add Another Experience</p>
            <i className="bi bi-plus-lg text-xl" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[420px]">
            <h2 className="text-xl font-bold mb-4">Edit Experience</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
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
                label="Job Title"
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
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <TextField
                type="date"
                size="small"
                label="End Date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={endDate}
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
                placeholder="Describe your responsibilities, achievements, and key contributions"
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={deleteExperience}
                  className="flex-1 py-2 border text-red-600 rounded-lg hover:bg-gray-100"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
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

export default EditExperience;
