import "antd/dist/antd.css";
import styles from "./Register.module.scss";
import { Form, Input, Checkbox, Button, Typography, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/actions";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
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
      offset: 8,
    },
  },
};

function Register() {
  const { Text, Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (values, form) => {
    console.log("Received values of form: ", values);
    dispatch(register(values, form));
  };

  const handleChange = () => {
    navigate("/");
  };

  return (
    <div>
      <Row justify="center">
        <Title level={2}>Create New Account</Title>
      </Row>

      <Form
        className={styles.form}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleRegister}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
            {
              min: 5,
              message: "Username must be minimum 5 characters.",
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
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Username must be minimum 8 characters.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <span className={styles.change}>agreement</span>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <br />
          <br />
          <Text className={styles.text} italic offset="4">
            Already have a account?
          </Text>
          <Text
            className={styles.change}
            underline
            italic
            onClick={handleChange}
          >
            {" "}
            Log in
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
