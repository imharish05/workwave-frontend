import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../Slices/employeeService";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const EditLocation = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [cityState, setCityState] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [relocation, setRelocation] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const openModal = () => {
    setName(employee.userName ?? "");
    setPhone(employee.phone ?? "");

    setCountry(employee.location?.country ?? "");
    setStreet(employee.location?.street ?? "");
    setCityState(employee.location?.cityState ?? "");
    setArea(employee.location?.area ?? "");
    setPincode(employee.location?.pincode ?? "");
    setRelocation(
      typeof employee.location?.relocation === "boolean"
        ? employee.location.relocation
        : null
    );

    setOpen(true);
  };

  const submitDetails = async (e) => {
    e.preventDefault();

    const payload = {
      userName: name,
      phone,
      location: {
        country,
        street,
        cityState,
        area,
        pincode,
        relocation,
      },
    };

    await updateUserProfile(dispatch, payload);
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
            <h1 className="text-2xl font-bold">Location</h1>
          </div>

          {employee.location ? (
            <div className="flex justify-between py-4 border-b font-semibold">
              <div>
                <p>{employee.location.cityState}</p>
                <p className="text-sm text-gray-500">
                  {employee.location.country}
                </p>
              </div>
              <i
                className="bi bi-highlighter cursor-pointer"
                onClick={openModal}
              />
            </div>
          ) : (
            <p className="font-semibold py-3 text-gray-600">
              No location added yet
            </p>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-4 w-[90%] md:w-[420px]">
            <h2 className="text-xl font-bold mb-4">Edit Location</h2>

            <form className="flex flex-col gap-3" onSubmit={submitDetails}>
              <TextField size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField size="small" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <TextField size="small" label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
              <TextField size="small" label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
              <TextField size="small" label="City / State" value={cityState} onChange={(e) => setCityState(e.target.value)} />
              <TextField size="small" label="Area" value={area} onChange={(e) => setArea(e.target.value)} />
              <TextField size="small" label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />

              <FormControl>
                <FormLabel>Willing to relocate</FormLabel>
                <RadioGroup
                  row
                  value={relocation === null ? "" : String(relocation)}
                  onChange={(e) => setRelocation(e.target.value === "true")}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border rounded-lg py-2">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-black text-white rounded-lg py-2">
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

export default EditLocation;
