import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../Slices/authSlice";
import { resetEmployee } from "../Slices/employeeSlice";
import { resetEmployer } from "../Slices/employerSlice";
import { clearAllJobs } from "../Slices/jobSlice";

const EmployeeDashboard = () => {
  const employee = useSelector((state) => state.employee);

  const email = useSelector((state) => state.auth.user.email);

  const dispatch = useDispatch();

  if (!employee?.userName) return null;

  const nameParts = employee.userName.trim().split(/\s+/);
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
  const secondInitial = nameParts[1]?.[0]?.toUpperCase() || "";

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetEmployee());
    dispatch(resetEmployer());
    dispatch(clearAllJobs())
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full px-5 py-3 flex items-center justify-center">
        <div className="xl:w-[55%] w-100 md:p-4">
          {/* {Avatar} */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="md:text-3xl text-xl font-bold">
                {employee.userName.toUpperCase()}
              </h1>
            </div>
            <div className="w-15 h-15 md:w-25 md:h-25 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-semibold">
              {firstInitial}
              {secondInitial}
            </div>
          </div>

          {/* Profile */}
          <Link
            to="/employee/edit-profile"
            className="text-start py-5 flex items-center group"
          >
            <div className="flex-1">
              <p className="py-2 font-semibold">
                <i className="bi bi-envelope-paper px-2"></i> {email}
              </p>

              <p className="py-2 font-semibold">
                <i className="bi bi-telephone px-2"></i> {employee.phone}
              </p>

              <p className="py-2 font-semibold">
                <i className="bi bi-geo-alt px-2"></i>
                {employee.location.cityState}, {employee.location.country}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <i
                className="
        bi bi-highlighter
        text-xl
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
              ></i>
            </div>
          </Link>

          {/* Resume */}
          <Link to={"/employee/resume"}>
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Resume
            </h1>
            <div className="py-5 flex group">
              <div className="flex flex-1">
                <i className="bi bi-filetype-pdf text-5xl text-blue-600"></i>
                <div className="text-start">
                  <p className="text-md text-gray-600 ps-4">
                    {employee.resume?.split("/").pop()}
                  </p>
                  <button
                    onClick={() => {
                      window.open(employee.resume, "_blank");
                    }}
                    className="ms-4 cursor-pointer hover:text-blue-500"
                  >
                    View Resume
                  </button>
                </div>
              </div>
              <i
                className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
              ></i>
            </div>
          </Link>

          {/* Education */}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Education
            </h1>

            <Link
              to={
                employee.education.length > 0
                  ? "/employee/edit-education"
                  : "/employee/education"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi bi-mortarboard text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.education.length > 0 ? (
                      <p className="text-md text-gray-600 ps-4">
                        {employee.education?.[0]?.degree?.toUpperCase()}
                      </p>
                    ) : (
                      <p>No Education added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.education.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>

          {/* Skill */}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Skills
            </h1>

            <Link
              to={
                employee.skill.length > 0
                  ? "/employee/edit-skill"
                  : "/employee/skill"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi bi-stars text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.skill.length > 0 ? (
                      <ul>
                        {employee.skill.map((item, index) => (
                          <li key={index}>
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1).toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.skill.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>

          {/* Experience */}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Experience
            </h1>

            <Link
              to={
                employee.experience.length > 0
                  ? "/employee/edit-experience"
                  : "/employee/experience"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi-list-stars text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.experience.length > 0 ? (
                      employee.experience.map((items, index) => (
                        <p key={index}>
                          {items.company.charAt(0).toUpperCase() +
                            items.company.slice(1).toLowerCase()}
                        </p>
                      ))
                    ) : (
                      <p>No Experience Added</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.experience.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>

          {/* Certificates */}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Certificates
            </h1>

            <Link
              to={
                employee.certifications?.length > 0
                  ? "/employee/edit-certificate"
                  : "/employee/certificates"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi bi bi-award text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.certifications?.length > 0 ? (
                      employee.certifications.map((items, index) => (
                        <p key={index}>
                          {items.name.charAt(0).toUpperCase() +
                            items.name.slice(1).toLowerCase()}
                        </p>
                      ))
                    ) : (
                      <p>No Certifications Added</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.certifications?.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>

          {/*  jobPreferences*/}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Job Preferences
            </h1>

            <Link
              to={
                employee.jobPreferences?.length > 0
                  ? "/employee/edit-job-preference"
                  : "/employee/job-preferences"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi bi-person-workspace text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.jobPreferences?.length > 0 ? (
                      <ul>
                        <ul>
                          {employee.jobPreferences.map((item, index) => (
                            <li key={index}>{item.jobTitle.join(", ")}</li>
                          ))}
                        </ul>
                      </ul>
                    ) : (
                      <p>No job preferences added</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.jobPreferences?.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>

          {/* Language */}
          <div className="py-3">
            <h1 className="text-start md:text-2xl text-lg font-semibold">
              Languages
            </h1>

            <Link
              to={
                employee.languages.length > 0
                  ? "/employee/edit-language"
                  : "/employee/language"
              }
              className="py-5 flex group"
            >
              <div className="flex flex-1">
                <i className="bi bi-translate text-5xl text-blue-600"></i>
                <div className="text-start flex items-center">
                  <div className="text-md text-gray-600 ps-4">
                    {employee.languages.length > 0 ? (
                      employee.languages.map((items, index) => (
                        <div>
                          <p key={index}>
                            {items.name.charAt(0).toUpperCase() +
                              items.name.slice(1).toLowerCase()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No Language Added</p>
                    )}
                  </div>
                </div>
              </div>

              {employee.languages.length > 0 ? (
                <i
                  className="
        bi bi-highlighter
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              ) : (
                <i
                  className="
        bi bi-plus-lg
        text-xl
        self-end
        transition-transform duration-300 ease-out
        group-hover:text-blue-400
      "
                ></i>
              )}
            </Link>
          </div>
          {/* Applied Jobs */}
          <section className="py-2 text-start">
            <h1 className="md:text-2xl text-lg font-semibold">Jobs Applied</h1>

            <Link
              to={
                employee.appliedJobs.length > 0
                  ? "/employee/applied-jobs"
                  : "/employee/all-jobs"
              }
              className="pt-5 flex group"
            >
              <div className="flex-1 flex items-center">
                <i className="bi bi-joystick text-blue-600 text-5xl"></i>
                {employee.appliedJobs.length > 0 ? (
                  <p className="ps-3">{employee.appliedJobs.length} job(s) applied</p>
                ) : (
                  <p>Not Applied to jobs yet</p>
                )}
              </div>

              <i
                className={`bi ${
                  employee.appliedJobs.length > 0
                    ? "bi-highlighter"
                    : "bi-plus-lg"
                } text-xl group-hover:text-blue-400`}
              ></i>
            </Link>
          </section>

          <div className="mt-10 pt-6 border-t">
            <button
              type="button"
              onClick={() => {
                handleLogout();
              }}
              className="
      w-full
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-red-500
      px-4
      py-3
      text-red-600
      font-semibold
      transition-all
      duration-200
      hover:bg-red-500
      hover:text-white
      active:scale-[0.98]
      focus:outline-none
      focus:ring-2
      focus:ring-red-400
    "
            >
              <i className="bi bi-box-arrow-right text-lg"></i>
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
