import "antd/dist/antd.css";
import styles from "./Login.module.scss";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/actions";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

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
        <Col span={12} offset={6} className={styles.container}>
          <Title level={2} style={{ textAlign: "center", margin: 20 }}>
            Log In
          </Title>
          <Form
            {...formItemLayout}
            name="normal_login"
            className={styles.form}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
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
