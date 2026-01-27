import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setLanguage } from "../Slices/employeeSlice";
import MenuItem from "@mui/material/MenuItem";

const EditLanguage = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
    const [name, setName] = useState("");
    const [proficiency, setProficiency] = useState("");

  /* Open modal */
  const openModal = (item) => {
    setCurrentId(item._id);
    setName(item.name);
    setProficiency(item.proficiency);
    setOpen(true);
    console.log(currentId);
  };

  /* Save changes */
  const submitDetails = async (e) => {
  e.preventDefault();

  if (!name.trim() || !proficiency.trim()) return;

  const payload = {
    name: name.toLowerCase(),
    proficiency: proficiency.toLowerCase(),
  };

  const res = await api.put(`/employee/language/${currentId}`, payload);

  dispatch(setLanguage(res.data.languages));
  setOpen(false);
};

const deleteLanguage = async (e) => {
  e.preventDefault();

  const res = await api.delete(`/employee/language/${currentId}`);

  dispatch(setLanguage(res.data.languages));
  
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
            <h1 className="text-2xl font-bold">Languages</h1>
          </div>

          {employee.languages.length > 0 ? (
            employee.languages.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
              >
                <div className="flex">
                  <p className="pe-2">{item.name.toUpperCase()}</p>
                </div>
                <i
                  className="bi bi-highlighter text-xl cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-black text-start font-semibold py-3 text-md">
              No Languages available
            </p>
          )}

          <Link
            to={"/employee/language"}
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500 font-semibold py-3 text-md">
              Add Another Language
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
            <h2 className="text-xl font-bold mb-4">Edit Language</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
              <TextField
                size="small"
                label="Language"
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
              {["beginner","intermediate","expert","fluent","native"].map(
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
                  onClick={(e) => deleteLanguage(e)}
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

export default EditLanguage;
