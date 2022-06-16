import "antd/dist/antd.css";
import { AliwangwangOutlined } from "@ant-design/icons";
import styles from "./Home.module.scss";
import { Divider, Typography, Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import Logout from "../../components/Logout";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../redux/auth/selector";

function Home() {
  const { Title } = Typography;
  const accessToken = useSelector(selectAccessToken);
  return (
    <div>
      <Row className={styles.header}>
        <Col flex="80%">
          <Title className={styles.title}>
            Quiz App
            <AliwangwangOutlined />
          </Title>
        </Col>
        <Col flex="auto">{accessToken && <Logout />}</Col>
        <Divider />
      </Row>
      <Outlet />
    </div>
  );
}

export default Home;
