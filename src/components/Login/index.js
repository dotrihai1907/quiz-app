import "antd/dist/antd.css";
import styles from "./Login.module.scss";
import { Form, Input, Button, Checkbox, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/actions";

function Login() {
  const { Title, Text } = Typography;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = () => {
    navigate("/register");
  };

  const handleLogin = (values) => {
    console.log("Received values of form: ", values);
    dispatch(login(values));
  };
  return (
    <div>
      <Row>
        <Col span={16} offset={4}>
          <Title level={2}>Log In</Title>
          <Form
            name="normal_login"
            className={styles.form}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.remember}>Remember me</Checkbox>
              </Form.Item>

              <span className={styles.forgot}>Forgotten password?</span>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
              >
                Log In
              </Button>
              <br />
              <br />
              <span> Or </span>
              <Text
                italic
                underline
                className={styles.change}
                onClick={handleChange}
              >
                {" "}
                register now!
              </Text>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
