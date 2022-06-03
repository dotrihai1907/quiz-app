import "antd/dist/antd.css";
import styles from "./Home.module.scss";
import { Divider } from "antd";
import { Outlet } from "react-router-dom";
import Logout from "../../components/Logout";

function Home() {
  return (
    <div>
      <h2>Home page</h2>
      <Logout />
      <Divider />
      <Outlet />
    </div>
  );
}

export default Home;
