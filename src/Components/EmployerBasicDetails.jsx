import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Navbar from "../Components/Navbar";
import setEmployerData from "../Slices/employerService";

const EmployerBasicDetails = () => {
  const [companyName, setCompanyName] = useState();
  const [industry, setIndustry] = useState();
  const [companySize, setCompanySize] = useState();
  const [website, setWebsite] = useState();
  const [country, setCountry] = useState();
  const [street, setStreet] = useState();
  const [cityState, setCityState] = useState();
  const [area, setArea] = useState();
  const [pincode, setPincode] = useState();
  const [description, setDescription] = useState();
  const [hrName, setHrName] = useState();
  const [hrPhone, setHrPhone] = useState();
  const [hrEmail, setHrEmail] = useState();

  const dispatch = useDispatch();

  const submitDetails = (e) => {
    e.preventDefault();

    const employerData = {
      companyName: companyName,
      industry: industry,
      companySize: companySize,
      website: website,
      location: {
        country: country,
        street: street,
        cityState: cityState,
        area: area,
        pincode: pincode,
      },
      description: description,
      hrName: hrName,
      hrPhone: hrPhone,
      hrEmail: hrEmail,
    };
    setEmployerData(dispatch,employerData)
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-screen flex justify-center items-center mt-10">
        {/* CARD */}
        <div className="w-full max-w-lg md:max-w-2xl shadow-xl rounded-2xl p-6 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold text-center">
            Enter Details
          </p>

          {/* FORM */}
          <form
            className="w-full mt-6 flex flex-col gap-4"
            onSubmit={(e) => submitDetails(e)}
          >
            <TextField
              size="small"
              label="Company Name"
              variant="outlined"
              type="string"
              id="companyName"
              required
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <TextField
              size="small"
              label="Industry Name"
              variant="outlined"
              type="string"
              id="industryName"
              required
              fullWidth
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />

            <TextField
              size="small"
              label="Company Size"
              variant="outlined"
              type="number"
              inputProps={
                {min : 1}
              }
              id="companySize"
              required
              fullWidth
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            />

            <TextField
              size="small"
              label="HR Name"
              variant="outlined"
              type="string"
              id="hrName"
              required
              fullWidth
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
            />

            <TextField
              size="small"
              label="HR Mobile Number"
              variant="outlined"
              type="tel"
              required
              id="hrMobile"
              fullWidth
              inputProps={{
                maxLength: 10,
                pattern: "[0-9]{10}",
              }}
              value={hrPhone}
              onChange={(e) => setHrPhone(e.target.value)}
            />

            <TextField
              size="small"
              label="HR Email Address"
              variant="outlined"
              type="email"
              required
              id="hrEmail"
              fullWidth
              value={hrEmail}
              onChange={(e) => setHrEmail(e.target.value)}
            />

            <TextField
              size="small"
              label="Street Address"
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
              label="Area / Locality"
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

            <TextField
              size="small"
              label="Company Website"
              variant="outlined"
              type="url"
              id="country"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
              required
              placeholder="https://www.company.com"
            />

            <TextField
              size="small"
              label="Company Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              required
              rows={4}
              fullWidth
              placeholder="Briefly describe your company, culture, and what you do"
            />

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

export default EmployerBasicDetails;
