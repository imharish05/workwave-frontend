import React, { useState } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setCertifications } from "../Slices/employeeSlice";

/* Format backend date → input[type="month"] (YYYY-MM) */
const formatForMonthInput = (date) =>
  date ? new Date(date).toISOString().slice(0, 7) : "";

const EditCertificate = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");

  /* Open modal and preload data */
  const openModal = (item) => {
    setCurrentId(item._id);
    setName(item.name || "");
    setExpiryMonth(formatForMonthInput(item.expireYear));
    setOpen(true);
  };

  /* Update certificate */
 const submitDetails = async (e) => {
  e.preventDefault();

  if (!name.trim()) return;

  const expiryDate = expiryMonth
    ? new Date(`${expiryMonth}-01`)
    : null;

  const res = await api.put(`/employee/certifications/${currentId}`, {
    name,
    expireYear: expiryDate,
  });

  dispatch(setCertifications(res.data.certifications));
  setOpen(false);
};


  /* Delete certificate */
  const deleteCertificate = async (e) => {
    e.preventDefault();

    const res = await api.delete(`/employee/certifications/${currentId}`);

    dispatch(setCertifications(res.data.certificate));
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
            <h1 className="text-2xl font-bold">Certificates</h1>
          </div>

          {employee.certifications?.length > 0 ? (
            employee.certifications.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
              >
                <p>{item.name?.toUpperCase()}</p>
                <i
                  className="bi bi-highlighter  text-xl cursor-pointer"
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <p className="font-semibold py-3">No certifications added yet</p>
          )}

          <Link
            to="/employee/certificates"
            className="flex justify-between items-center py-4 border-b border-gray-300 font-semibold"
          >
            <p className="text-blue-500">Add Another Certificate</p>
            <i className="bi bi-plus-lg text-xl" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[420px]">
            <h2 className="text-xl font-bold mb-4">Edit Certificate</h2>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={submitDetails}
            >
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

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={deleteCertificate}
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

export default EditCertificate;
