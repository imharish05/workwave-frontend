import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import api from "../api/axios.js";

import {
  setProfile,
  setEducation,
  setResume,
  setEmployeeLoaded,
  setSkill,
  setCertifications,
  setJobPreferences,
  setExperience,
  setLanguage,
  setAppliedJobs,
} from "../Slices/employeeSlice.js";

import {
  setEmployerProfile,
  setEmployerLoaded,
} from "../Slices/employerSlice.js";

import PreLoader from "./PreLoader.jsx";

/* AUTH GUARD */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

/* PROFILE BOOTSTRAP */
export const ProfileBootstrap = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.auth.user?.role);
  const employee = useSelector((state) => state.employee);
  const employer = useSelector((state) => state.employer);

  const PUBLIC_ALLOWED = ["/set-role", "/logout"];

  const isPublicAllowed = PUBLIC_ALLOWED.includes(location.pathname);

  useEffect(() => {
    if (!role) return;

    const loadProfile = async () => {
      if (role === "employee" && !employee.isEmployeeProfileLoaded) {
        const [
          profile,
          edu,
          resume,
          skills,
          certificates,
          jobPreference,
          jobExperience,
          language,
          appliedJobs
        ] = await Promise.all([
          api.get("/employee/profile"),
          api.get("/employee/education"),
          api.get("/employee/resume"),
          api.get("/employee/skills"),
          api.get("/employee/certifications"),
          api.get("/employee/job-preferences"),
          api.get("/employee/experience"),
          api.get("/employee/language"),
          api.get("/employee/applied-jobs"),
        ]);

        dispatch(setProfile(profile.data));
        dispatch(setEducation(edu.data.education));
        dispatch(setResume(resume.data.resumeUrl));
        dispatch(setSkill(skills.data.skills));
        dispatch(setCertifications(certificates.data.certifications));
        dispatch(setJobPreferences(jobPreference.data.jobPreferences));
        dispatch(setExperience(jobExperience.data.experience));
        dispatch(setLanguage(language.data.languages));
        dispatch(setAppliedJobs(appliedJobs.data));
        dispatch(setEmployeeLoaded(true));
      }

      if (role === "employer" && !employer.isEmployerProfileLoaded) {
        const res = await api.get("/employer");
        dispatch(setEmployerProfile(res.data.employer));
        dispatch(setEmployerLoaded(true));
      }
    };

    loadProfile();
  }, [role]);

  if (!role) return <PreLoader />;

  if (
    (role === "employee" && !employee.isEmployeeProfileLoaded) ||
    (role === "employer" && !employer.isEmployerProfileLoaded)
  ) {
    return <PreLoader />;
  }

  /* ===== EMPLOYEE FLOW ===== */
  if (role === "employee" && !isPublicAllowed) {
    const hasBasic =
      employee.userName && employee.phone && employee.location?.country;

    const hasEducation = employee.education?.length > 0;
    const hasResume = Boolean(employee.resume);

    if (!hasBasic && location.pathname !== "/employee/profile") {
      return <Navigate to="/employee/profile" replace />;
    }

    if (hasBasic && !hasEducation && location.pathname !== "/employee/education") {
      return <Navigate to="/employee/education" replace />;
    }

    if (
      hasBasic &&
      hasEducation &&
      !hasResume &&
      location.pathname !== "/employee/resume"
    ) {
      return <Navigate to="/employee/resume" replace />;
    }

    if (
      hasBasic &&
      hasEducation &&
      hasResume &&
      location.pathname === "/employee/resume"
    ) {
      return <Navigate to="/employee/all-jobs" replace />;
    }
  }

  /* ===== EMPLOYER FLOW ===== */
  if (role === "employer" && !isPublicAllowed) {
    const complete =
      employer.companyName && employer.industry && employer.companySize;

    if (!complete && location.pathname !== "/employer/profile") {
      return <Navigate to="/employer/profile" replace />;
    }

    if (complete && location.pathname === "/employer/profile") {
      return <Navigate to="/employer/applicants" replace />;
    }
  }

  return <Outlet />;
};


export default ProtectedRoute;
