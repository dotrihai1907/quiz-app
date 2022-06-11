import "antd/dist/antd.css";
import { Form, Input, Select, Button, Typography, Row } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../../redux/user/actions";

import { selectAccessToken } from "../../redux/auth/selector";

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

function CreateUser() {
  const { Title } = Typography;
  const { Option } = Select;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleCreate = (values, form) => {
    console.log("Received values of form: ", values);
    dispatch(createUser(values, accessToken, form));
  };

  return (
    <div>
      <Row justify="center">
        <Title level={2}>Create New User</Title>
      </Row>

      <Form
        {...formItemLayout}
        form={form}
        name="create_user"
        scrollToFirstError
        onFinish={handleCreate}
      >
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
          name="role"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="admin">admin</Option>
            <Option value="user">user</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateUser;
