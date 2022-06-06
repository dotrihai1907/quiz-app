import styles from "./Admin.module.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  selectUsernameAuth,
  selectAccessToken,
} from "../../redux/auth/selector";

import { getUsers } from "../../redux/user/actions";

const { Header, Sider, Content } = Layout;

function Admin() {
  const usernameAuth = useSelector(selectUsernameAuth);
  const accessToken = useSelector(selectAccessToken);

  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className={styles.logo}>{usernameAuth}</div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: (
                  <UserAddOutlined
                    onClick={() => dispatch(getUsers(accessToken))}
                  />
                ),
                label: "User",
              },
              {
                key: "2",
                icon: <ReadOutlined />,
                label: "Question",
              },
            ]}
          />
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
