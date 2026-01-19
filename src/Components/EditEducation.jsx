import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setEducation } from "../Slices/employeeSlice";

const EditEducation = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");

  /* Open modal */
  const openModal = (item) => {
    setCurrentId(item._id);
    setDegree(item.degree);
    setCourse(item.course);
    setOpen(true);
  };

  /* Save changes */
  const submitDetails = async (e) => {
    e.preventDefault();

    if (!degree.trim() || !course.trim()) return;

    const res = await api.put(`/employee/education/${currentId}`, {
      degree,
      course,
    });

    dispatch(setEducation(res.data.education));
    setOpen(false);
  };

  const deleteSkills = async (e) => {
    e.preventDefault();

    const res = await api.delete(`/employee/education/${currentId}`);
    dispatch(setEducation(res.data.employee.education));
    
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
            <h1 className="text-2xl font-bold">Education</h1>
          </div>

          {employee.education.length > 0 ? (
            employee.education.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
              >
                <div className="flex">
                  <p className="pe-2">{item.degree.toUpperCase()}</p>
                  <p>{item.course.toUpperCase()}</p>
                </div>
                <i
                  className="bi bi-highlighter text-xl cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-blue-500 font-bold py-3 text-xl">
              No education is added
            </p>
          )}

          <Link
            to={"/employee/education"}
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500 font-semibold py-3 text-xl">
              Add another education
            </p>
            <i
              className="bi bi-plus-lg text-xl cursor-pointer"
          
            />
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Education</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
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
                <button
                  type="button"
                  onClick={(e) => deleteSkills(e)}
                  className="flex-1 py-2 border border-gray-300 text-red-600 rounded-lg
               font-medium hover:bg-gray-100 transition"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg
               font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2 bg-black text-white rounded-lg
               font-medium hover:bg-gray-800 transition"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEducation;
