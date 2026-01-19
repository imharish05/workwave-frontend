import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../Slices/employeeService"; 
import { updateCompanyDescription } from "../Slices/employerService";
// rename later to updateCompanyProfile if needed

const EditCompanyDescription = () => {
  const employer = useSelector((state) => state.employer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(employer)

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const openModal = () => {
    setDescription(employer.description ?? "");
    setOpen(true);
  };

  const submitDetails = async (e) => {
    e.preventDefault();

    const payload = {
        description,  
    };

    await updateCompanyDescription(dispatch, payload);
    setOpen(false);
  };

  return (
    <>
      <Navbar />

      <div className="w-full flex justify-center px-4 py-6">
        <div className="md:w-1/2 w-full">
          <div className="border-b pb-4 mb-4 flex items-center gap-4">
            <i
              className="bi bi-arrow-left text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Company Description</h1>
          </div>

          {employer.description ? (
            <div className="flex justify-between py-4 border-b font-semibold">
              <p>{employer.description}</p>
              <i
                className="bi bi-highlighter cursor-pointer"
                onClick={openModal}
              />
            </div>
          ) : (
            <p className="font-semibold py-3 text-gray-600">
              No description added yet
            </p>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-4 w-[90%] md:w-[420px]">
            <h2 className="text-xl font-bold mb-4">Edit Description</h2>

            <form className="flex flex-col gap-3" onSubmit={submitDetails}>
              <TextField
                size="small"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border rounded-lg py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white rounded-lg py-2"
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

export default EditCompanyDescription;
