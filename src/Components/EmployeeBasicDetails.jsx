import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { setProfile } from "../Slices/employeeSlice";
import { setUserData } from "../Slices/employeeService";

const EmployeeBasicDetails = () => {
  const { userName, role } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [cityState, setCityState] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [relocation, setRelocation] = useState("");

  const dispatch = useDispatch();

  const submitDetails = (e) => {
    e.preventDefault();

    const employeeData = {
      userName: name,
      phone: phone,
      location: {
        country: country,
        street: street,
        cityState: cityState,
        area: area,
        pincode: pincode,
        relocation: relocation,
      },
    };

    setUserData(dispatch, employeeData);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-screen flex justify-center items-center">
        {/* CARD */}
        <div className="w-full max-w-lg md:max-w-2xl shadow-xl rounded-2xl p-6 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold text-center">
            Enter Your Details
          </p>

          {/* FORM */}
          <form
            className="w-full mt-6 flex flex-col gap-4"
            onSubmit={(e) => submitDetails(e)}
          >
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              type="string"
              id="userName"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              label="Mobile Number"
              variant="outlined"
              type="tel"
              required
              id="mobile"
              fullWidth
              inputProps={{
                maxLength: 10,
                pattern: "[0-9]{10}",
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              size="small"
              label="Street"
              variant="outlined"
              type="string"
              id="Street"
              required
              fullWidth
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <TextField
              size="small"
              label="Area"
              variant="outlined"
              type="string"
              required
              id="Area"
              fullWidth
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />

            <TextField
              size="small"
              label="City & State"
              variant="outlined"
              type="string"
              required
              id="cityState"
              fullWidth
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
            />

            <TextField
              size="small"
              label="Country"
              variant="outlined"
              required
              type="string"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            />

            <TextField
              size="small"
              label="Pincode"
              variant="outlined"
              required
              type="number"
              id="pincode"
              fullWidth
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <FormControl>
              <FormLabel className="self-start">Willing to relocate</FormLabel>

              <RadioGroup
                row
                id="relocation"
                value={relocation}
                onChange={(e) => setRelocation(e.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>

            <button
              type="submit"
              className="w-full p-2 bg-black text-white rounded-lg"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBasicDetails;
