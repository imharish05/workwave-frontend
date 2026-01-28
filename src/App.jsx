import { lazy, Suspense, useEffect, useRef } from "react";
import "./App.css";
import PreLoader from "./Components/PreLoader";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute, {
  ProfileBootstrap,
} from "./Components/ProtectedRoute.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { authRestore } from "./Slices/authSlice.js";
import Navbar from "./Components/Navbar.jsx";
import EditEducation from "./Components/EditEducation.jsx";
import EditLocation from "./Components/EditLocation.jsx";
import EmployeeSkill from "./Components/EmployeeSkill.jsx";
import EditSkill from "./Components/EditSkill.jsx";
import EmployeeExperience from "./Components/EmployeeExperience.jsx";
import EditExperience from "./Components/EditExperience.jsx";
import EmployeeCertificates from "./Components/EmployeeCertificates.jsx";
import EditCertificate from "./Components/EditCertificate.jsx";
import EmployeeJobPreference from "./Components/EmployeeJobPreference.jsx";
import EditJobPreference from "./Components/EditJobPreference.jsx";
import EmployeeLanguage from "./Components/EmployeeLanguage.jsx";
import EditLanguage from "./Components/EditLanguage.jsx";
import EmployerJobApplicants from "./Components/EmployerJobApplicants.jsx";
import JobPost from "./Components/JobPost.jsx";
import EditEmployer from "./Components/EditEmployer.jsx";
import EditHrInfo from "./Components/EditHrInfo.jsx";
import EditCompanyDescription from "./Components/EditCompanyDescription.jsx";
import EditJobs from "./Components/EditJobs.jsx";
import JobCard from "./Components/JobCard.jsx";
import JobDetails from "./Components/JobDetails.jsx";
import AppliedJobs from "./Components/AppliedJobs.jsx";
import ViewApplicants from "./Components/ViewApplicants.jsx";
import ApplicantDetails from "./Components/ApplicantDetails.jsx";
import NotFound from "./Pages/NotFound.jsx";

const LandingPage = lazy(() => import("./Pages/LandingPage.jsx"));
const SignInForm = lazy(() => import("./Components/LoginForm.jsx"));
const SignUpForm = lazy(() => import("./Components/SignUpForm.jsx"));
const SetRole = lazy(() => import("./Components/SetRole.jsx"));
const GoogleCallBack = lazy(() => import("./Components/GoogleCallBack.jsx"));
const EmployeeProfile = lazy(() => import("./Pages/EmployeeProfile.jsx"));
const EmployeeBasicDetails = lazy(
  () => import("./Components/EmployeeBasicDetails.jsx"),
);
const EmployeeEducation = lazy(
  () => import("./Components/EmployeeEducation.jsx"),
);
const EmployeeResume = lazy(() => import("./Components/EmployeeResume.jsx"));
const AllJobs = lazy(() => import("./Pages/AllJobs.jsx"));
const EmployerProfile = lazy(() => import("./Pages/EmployerProfile.jsx"));
const EmployerBasicDetails = lazy(
  () => import("./Components/EmployerBasicDetails.jsx"),
);

function App() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toastId = useRef(null);

  useEffect(() => {
    dispatch(authRestore());
  }, [dispatch]);

  useEffect(() => {
    if (loading && !toastId.current)
      toastId.current = toast.loading("Authenticating...");
    if (!loading && toastId.current) {
      toast.dismiss(toastId.current);
      toastId.current = null;
    }
  }, [loading]);

  const date = new Date();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div>
      <ToastContainer position="top-center" toastStyle={{ width: "auto" }} limit={1}/>
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/sign" element={<SignUpForm />} />

          <Route
            path="/set-role"
            element={
              <ProtectedRoute>
                <SetRole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/google/callback"
            element={<GoogleCallBack />}
          />

          {/* Employee nested routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <ProfileBootstrap />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeProfile />} />
            <Route path="dashboard" element={<EmployeeProfile />} />
            <Route path="profile" element={<EmployeeBasicDetails />} />
            <Route path="edit-profile" element={<EditLocation />} />
            <Route path="education" element={<EmployeeEducation />} />
            <Route path="edit-education" element={<EditEducation />} />
            <Route path="resume" element={<EmployeeResume />} />
            <Route path="skill" element={<EmployeeSkill />} />
            <Route path="edit-skill" element={<EditSkill />} />
            <Route path="experience" element={<EmployeeExperience />} />
            <Route path="edit-experience" element={<EditExperience />} />
            <Route path="certificates" element={<EmployeeCertificates />} />
            <Route path="edit-certificate" element={<EditCertificate />} />
            <Route path="job-preferences" element={<EmployeeJobPreference />} />
            <Route path="edit-job-preference" element={<EditJobPreference />} />
            <Route path="language" element={<EmployeeLanguage />} />
            <Route path="edit-language" element={<EditLanguage />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>

          <Route
            path="/jobs/:jobKey"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />

          {/* Employer nested routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute>
                <ProfileBootstrap />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployerProfile />} />
            <Route path="profile" element={<EmployerBasicDetails />} />
            <Route path="dashboard" element={<EmployerProfile />} />
            <Route path="applicants" element={<EmployerJobApplicants />} />
            <Route path="edit-profile" element={<EditEmployer />} />
            <Route path="edit-hr" element={<EditHrInfo />} />
            <Route path="jobs" element={<EditJobs />} />
            <Route
              path="edit-description"
              element={<EditCompanyDescription />}
            />
            <Route path="post-job" element={<JobPost />} />
          </Route>
          <Route
            path="view-applicants/:jobkey"
            element={
              <ProtectedRoute>
                <ViewApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="applicant-details/:jobKey/:applicantId"
            element={
              <ProtectedRoute>
                <ApplicantDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <p>&copy; {date.getFullYear()} Workwave</p>
    </div>
  );
}

export default App;
