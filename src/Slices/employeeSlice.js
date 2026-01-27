import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isEmployeeProfileLoaded: false,
  userName: null,
  phone: null,
  location: {
    country: null,
    street: null,
    cityState: null,
    area: null,
    pincode: null,
    relocation: false,
  },
  resume: null,
  education: [],
  experience: [],
  skill: [],

  certifications: [],

  jobPreferences: [],
  languages: [],
  appliedJobs : []
};

const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    setProfile: (state, action) => {
      const { userName, phone, location } = action.payload;

      if (userName !== undefined) {
        state.userName = userName;
      }

      if (phone !== undefined) {
        state.phone = phone;
      }

      if (location) {
        state.location = {
          ...state.location,
          ...location,
        };
      }
    },

    setEmployeeLoaded: (state, action) => {
      state.isEmployeeProfileLoaded = action.payload;
    },
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setSkill: (state, action) => {
      state.skill = action.payload;
    },
    setCertifications: (state, action) => {
      state.certifications = action.payload;
    },
    setJobPreferences: (state, action) => {
      state.jobPreferences = action.payload;
    },
    setLanguage: (state, action) => {
      state.languages = action.payload;
    },
    setAppliedJobs : (state,action) => {
      state.appliedJobs = action.payload
    },
    resetEmployee: () => initialState,
  },
});

export default employeeSlice.reducer;
export const {
  setProfile,
  setResume,
  setEmployeeLoaded,
  setEducation,
  setExperience,
  setSkill,
  setCertifications,
  setJobPreferences,
  setLanguage,
  resetEmployee,
  setAppliedJobs
} = employeeSlice.actions;
