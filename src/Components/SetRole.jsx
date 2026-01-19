import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { roleSelect } from "../Slices/authServise";

const SetRole = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userRole, SetUserRole] = useState("");

  const { role } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userRole === "employee") {
      navigate("/employee", { relative: true });
    }
    if (userRole === "employer") {
      navigate("/employer", { relative: true });
    }
  }, [role]);

  useEffect(() => {
    if (role) {
      SetUserRole(role);
    }
  }, [role]);
  

  const handleSelect = (e) => {
    e.preventDefault();

    if (!userRole) return;

    roleSelect(dispatch, userRole);
  };

  return (
    <div className="h-screen overflow-hidden w-full overflow-x-hidden flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <img
          src={Logo}
          alt="Workwave logo"
          className="object-contain max-w-xs max-h-40 md:max-w-md"
        />

        <p className="font-bold text-sm md:text-3xl">Select your role</p>

        <p className="text-sm md:text-base p-4">
          You must choose how you’ll use the platform.
        </p>

        <form
          onSubmit={(e) => {
            handleSelect(e);
          }}
        >
          <div className="space-y-3 px-20 md:w-sm md:flex sm:py-3 md:space-y-0 items-center justify-between">
            <label className="flex items-center gap-3 mb-0 font-bold">
              <input
                type="radio"
                name="role"
                value="employee"
                checked={userRole === "employee"}
                onChange={(e) => SetUserRole(e.target.value)}
                className="h-4 w-4 accent-black"
              />
              Employee
            </label>

            <label className="flex items-center gap-3 font-bold">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={userRole === "employer"}
                onChange={(e) => SetUserRole(e.target.value)}
                className="h-4 w-4 accent-black"
              />
              Employer
            </label>
          </div>

          <div className="flex justify-around align-center mt-4">
          {role && (<button type="button" onClick={() => navigate(-1)} className="p-2 pe-3 rounded-lg hover:bg-blue-700 hover:text-white bg-black text-white">← Back</button>)}
          <button
            className="border p-2 rounded-lg hover:bg-black hover:text-white bg-blue-700 text-white"
            type="submit"
          >
            Submit
          </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SetRole;
