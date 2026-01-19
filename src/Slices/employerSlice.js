import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isEmployerProfileLoaded : false,
   _id: null,
  authId: null,
  companyName: null,
  industry: null,
  companySize: null,
  website: null,
  location: {
    country: null,
    cityState: null,
    street: null,
    area: null,
    pincode: null,
  },
  description: null,
  hrName: null,
  hrPhone: null,
  hrEmail: null,
  jobPosted: [],

  createdAt: null,
  updatedAt: null,
};

const employerSlice = createSlice({
  name: "employer",
  initialState: initialState,
  reducers: {
    setEmployerProfile :(state,action) => {
    const {companyName,industry,companySize,website,location,description,hrName,hrEmail,hrPhone,_id,authId,jobPosted,createdAt,updatedAt} = action.payload
    state.isEmployerProfileLoaded = true
    state.companyName = companyName
    state.industry = industry
    state.companySize = companySize
    state.website = website
    state.location = location
    state.description = description
    state.hrName = hrName
    state.hrEmail = hrEmail
    state.hrPhone = hrPhone
    state._id = _id
    state.jobPosted = jobPosted
    state.authId = authId
    state.createdAt = createdAt
    state.updatedAt = updatedAt
    },
    setEmployerLoaded : (state,action) => {
      state.isEmployerProfileLoaded = action.payload
    },
    resetEmployer: () => initialState,
  }
});



export default employerSlice.reducer;
export const {setEmployerProfile,setEmployerLoaded,resetEmployer} = employerSlice.actions;
