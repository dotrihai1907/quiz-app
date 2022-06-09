import "antd/dist/antd.css";
import { AliwangwangOutlined } from "@ant-design/icons";
import styles from "./Home.module.scss";
import { Divider, Typography } from "antd";
import { Outlet } from "react-router-dom";
import Logout from "../../components/Logout";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../redux/auth/selector";

function Home() {
  const { Title } = Typography;
  const accessToken = useSelector(selectAccessToken);
  return (
    <div>
      <Title className={styles.header}>
        Quiz App
        <AliwangwangOutlined />
      </Title>
      {accessToken && <Logout />}
      <Divider />
      <Outlet />
    </div>
  );
}

export default Home;
