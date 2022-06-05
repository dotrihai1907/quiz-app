import { Navigate, Outlet } from "react-router-dom";

export const RedirectRole = ({ role, accessToken }) => {
  if (accessToken && role === "user") {
    return <Navigate to="/quizsetting" />;
  }
  if (accessToken && role === "admin") {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
};

export const UserRole = ({ role, accessToken }) => {
  if (accessToken === null) {
    return <Navigate to="/" />;
  }
  if (accessToken && role === "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
