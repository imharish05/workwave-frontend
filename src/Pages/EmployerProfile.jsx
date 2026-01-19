import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { logOut } from "../Slices/authSlice";
import { resetEmployer } from "../Slices/employerSlice";
import { resetEmployee } from "../Slices/employeeSlice";
import { clearAllJobs } from "../Slices/jobSlice";

const EmployerProfile = () => {
  const employer = useSelector((state) => state.employer);
  const email = useSelector((state) => state.auth.user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!employer?.companyName) return null;

  const initials = employer.companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetEmployer());
    dispatch(resetEmployee());
    dispatch(clearAllJobs())
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  console.log(employer.jobPosted)

  return (
    <>
      <Navbar />

      <div className="w-full px-5 py-3 flex justify-center">
        <div className="xl:w-[55%] w-full md:p-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-xl font-bold">
              {employer.companyName.toUpperCase()}
            </h1>

            <div className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-semibold">
              {initials}
            </div>
          </div>

          {/* Company Info */}
          <Link to="/employer/edit-profile" className="py-5 flex group">
            <div className="flex-1 text-start">
              <p className="py-2 font-semibold">
                <i className="bi bi-envelope text-xl px-2"></i>
                {email}
              </p>

              <p className="py-2 font-semibold">
                <i className="bi bi-building px-2 text-xl"></i>
                {employer.industry}
              </p>

              <p className="py-2 font-semibold">
                <i className="bi bi-geo-alt px-2 text-xl"></i>
                {employer.location.cityState}, {employer.location.country}
              </p>
            </div>

            <i className="bi bi-highlighter text-xl group-hover:text-blue-400"></i>
          </Link>

          {/* HR Details */}
          <Link to="/employer/edit-hr" className="py-5 flex group">
            <section className="py-2 flex-1">
              <h1 className="md:text-2xl text-lg font-semibold text-start">
                HR Contact
              </h1>

              <div className="flex">
                <div className="flex-1 text-start">
                  <p className="py-1">
                    <i className="bi bi-person px-2"></i>
                    {employer.hrName}
                  </p>
                  <p className="py-1">
                    <i className="bi bi-telephone px-2"></i>
                    {employer.hrPhone}
                  </p>
                  <p>
                    <i className="bi bi-envelope-at px-2"></i>
                    {employer.hrEmail}
                  </p>
                </div>
              </div>
            </section>
            <i className="bi bi-highlighter text-xl group-hover:text-blue-400 "></i>
          </Link>

          {/* About Company */}
          <Link to="/employer/edit-description" className="py-5 flex group">
            <section className="py-2 text-start flex-1">
              <h1 className="md:text-2xl text-lg font-semibold">
                About Company
              </h1>
              <p className="text-gray-600 py-3">
                {employer.description || "No description added"}
              </p>
            </section>
            <i className="bi bi-highlighter text-xl group-hover:text-blue-400 "></i>
          </Link>

          {/* Jobs */}
          <section className="py-2 text-start">
            <h1 className="md:text-2xl text-lg font-semibold">Job Posts</h1>

            <Link
              to={
                employer.jobPosted.length > 0
                  ? "/employer/jobs"
                  : "/employer/post-job"
              }
              className="pt-5 flex group"
            >
              <div className="flex-1">
                {employer.jobPosted.length > 0 ? (
                  <p>{employer.jobPosted.length} job(s) posted</p>
                ) : (
                  <p>No jobs posted yet</p>
                )}
              </div>

              <i
                className={`bi ${
                  employer.jobPosted.length > 0
                    ? "bi-highlighter"
                    : "bi-plus-lg"
                } text-xl group-hover:text-blue-400`}
              ></i>
            </Link>
          </section>

          {/* Logout */}
          <div className="mt-10 pt-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500 px-4 py-3 text-red-600 font-semibold hover:bg-red-500 hover:text-white"
            >
              <i className="bi bi-box-arrow-right"></i>
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerProfile;
