import { toast } from "react-toastify";
import api from "../api/axios";

import {
  setAppliedJobs,
  setCertifications,
  setEducation,
  setExperience,
  setJobPreferences,
  setLanguage,
  setProfile,
  setResume,
  setSkill,
} from "./employeeSlice.js";

/* ---------------- PROFILE ---------------- */

export const setUserData = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/profile", userData);

    await toast.promise(promise, {
      pending: "Saving Profile...",
      success: {
        render({ data }) {
          dispatch(setProfile(data.data.employee));
          return "Profile Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- Update Profile ---------------- */

export const updateUserProfile = async (dispatch, payload) => {
  try {
    const promise = api.put("/employee/profile", payload);

    await toast.promise(promise, {
      pending: "Updating profile...",
      success: {
        render({ data }) {
          dispatch(setProfile(data.data.employee));
          return "Profile updated successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Update failed";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- EDUCATION ---------------- */

export const setEmployeeEducation = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/education", userData);

    await toast.promise(promise, {
      pending: "Saving Education...",
      success: {
        render({ data }) {
          dispatch(setEducation(data.data.education));
          return "Education Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- SKILLS ---------------- */

export const setEmployeeSkill = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/skills", userData);

    await toast.promise(promise, {
      pending: "Saving Skill...",
      success: {
        render({ data }) {
          dispatch(setSkill(data.data.skills));
          return "Skill Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

export const deleteEmployeeSkill = async (dispatch, skillId) => {
  try {
    const promise = api.delete(`/employee/skills/${skillId}`);

    await toast.promise(promise, {
      pending: "Deleting Skill...",
      success: {
        render({ data }) {
          dispatch(setSkill(data.data.skills));
          return "Skill Deleted Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Delete failed";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- EXPERIENCE ---------------- */

export const setEmployeeExperience = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/experience", userData);

    await toast.promise(promise, {
      pending: "Saving Experience...",
      success: {
        render({ data }) {
          dispatch(setExperience(data.data.experience));
          return "Experience Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- CERTIFICATIONS ---------------- */

export const setEmployeeCertificates = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/certifications", userData);

    await toast.promise(promise, {
      pending: "Saving Certification...",
      success: {
        render({ data }) {
          dispatch(setCertifications(data.data.certifications));
          return "Certification Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- JOB PREFERENCES ---------------- */

export const setEmployeeJobPreferences = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/job-preferences", userData);

    await toast.promise(promise, {
      pending: "Saving Job Preferences...",
      success: {
        render({ data }) {
          dispatch(setJobPreferences(data.data.jobPreference));
          return "Job Preferences Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- LANGUAGE ---------------- */

export const setEmployeeLanguage = async (dispatch, userData) => {
  try {
    const promise = api.post("/employee/language", userData);

    await toast.promise(promise, {
      pending: "Saving Language...",
      success: {
        render({ data }) {
          dispatch(setLanguage(data.data.languages));
          return "Language Updated Successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Something went wrong";
        },
      },
    });
  } catch (err) {
    toast.error("Unexpected error");
  }
};

/* ---------------- RESUME ---------------- */

export const uploadResume = (formData) => async (dispatch) => {
  try {
    const promise = api.post("/employee/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await toast.promise(promise, {
      pending: "Uploading Resume...",
      success: {
        render({ data }) {
          dispatch(setResume(data.data));
          return "Resume uploaded successfully";
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.message || "Upload failed";
        },
      },
    });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Applied jobs

export const fetchAppliedJobs = async (dispatch) => {
  try {
    const res = await api.get("/employee/applied-jobs");

    dispatch(setAppliedJobs(res.data));
  } catch (err) {
    console.error("Failed to fetch applied jobs", err.message);
  }
};
