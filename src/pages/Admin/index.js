import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h2>Admin page</h2>
      <Outlet />
    </div>
  );
}

export default Admin;
