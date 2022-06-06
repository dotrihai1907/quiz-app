import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo} />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "User",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
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
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <Outlet />
    </div>
  );
}

export default Admin;
