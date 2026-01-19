import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setSkill } from "../Slices/employeeSlice";
import MenuItem from "@mui/material/MenuItem";

const EditSkill = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");

  /* Open modal */
  const openModal = (item) => {
    setCurrentId(item._id);
    setName(item.name);
    setExperience(item.experience);
    setOpen(true);
  };

  /* Save changes */
  const submitDetails = async (e) => {
    e.preventDefault();

    if (!name.trim() || !experience.trim()) return;

    const res = await api.put(`/employee/skills/${currentId}`, {
      name,
      experience,
    });

    dispatch(setSkill(res.data.skills));
    setOpen(false);
  };
  
  const deleteSkills = async (e) => {
    e.preventDefault();
    
    const res = await api.delete(`/employee/skills/${currentId}`)
    
    dispatch(setSkill(res.data.employee.skills));
    setOpen(false);
  }

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
            <h1 className="text-2xl font-bold">Skills</h1>
          </div>

          {employee.skill.length > 0 ? (
            employee.skill.map((item) => (
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
              No skills information available
            </p>
          )}

          <Link
            to={"/employee/skill"}
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500 font-semibold py-3 text-md">
              Add Another Skill
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
            <h2 className="text-xl font-bold mb-4">Edit Skill</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
              <TextField
                size="small"
                label="Skill Name"
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

export default EditSkill;
