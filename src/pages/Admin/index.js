import styles from "./Admin.module.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOpenOutlined,
  UserOutlined,
  UserAddOutlined,
  ReadOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  selectUsernameAuth,
  selectAccessToken,
} from "../../redux/auth/selector";

import { getUsers } from "../../redux/user/actions";
import { getQuestionsAdmin } from "../../redux/question/actions";

const { Header, Sider, Content } = Layout;

function Admin() {
  const usernameAuth = useSelector(selectUsernameAuth);
  const accessToken = useSelector(selectAccessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleGetUsers = () => {
    dispatch(getUsers(accessToken));
    navigate("/admin/getusers");
  };

  const handleGetQuestions = () => {
    console.log(accessToken);
    dispatch(getQuestionsAdmin(accessToken));
    navigate("/admin/getquestionsadmin");
  };

  return (
    <div>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className={styles.logo}>{usernameAuth}</div>

          <Menu theme="light" mode="inline">
            <Menu.SubMenu key="1" icon={<FolderOpenOutlined />} title="User">
              <Menu.Item
                key="subuser1"
                icon={<UserOutlined />}
                onClick={handleGetUsers}
              >
                Get User
              </Menu.Item>
              <Menu.Item
                key="subuser2"
                icon={<UserAddOutlined />}
                onClick={() => navigate("/admin/createuser")}
              >
                Create User
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="2" icon={<ReadOutlined />} title="Question">
              <Menu.Item
                key="subquestion1"
                icon={<FolderOutlined />}
                onClick={handleGetQuestions}
              >
                Get Questions
              </Menu.Item>
              <Menu.Item
                key="subquestion2"
                icon={<FolderAddOutlined />}
                onClick={() => navigate("/admin/createquestion")}
              >
                Create Question
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className={styles.site_layout}>
          <Header
            className={styles.site_layout_background}
            style={{
              padding: 0,
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                className={styles.trigger}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className={styles.trigger}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </Header>
          <Content
            className={styles.site_layout_background}
            style={{
              margin: "16px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Admin;
