import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const roleRedirect = (role) => {
  switch (role) {
    case "employee":
      return "/employee/all-jobs";
    case "employer":
      return "/employer";
    default:
      return "/employee";
  }
};

const RoleGuard = ({ children }) => {
  const { user, authReady, roleChange } = useSelector(
    (state) => state.auth
  );

  if (!authReady) return null;

  if (roleChange) return children;

  if (user?.role) {
    return <Navigate to={roleRedirect(user.role)} replace />;
  }

  return children;
};

export default RoleGuard;