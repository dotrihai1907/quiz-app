import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Row } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { selectAccessToken } from "../../redux/auth/selector";

import { createQuestion } from "../../redux/question/actions";

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

function CreateQuestion() {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleCreateQuestion = (values, form) => {
    console.log("Received values of form: ", values);
    dispatch(createQuestion(values, accessToken, form));
  };
  return (
    <div>
      <Row justify="center">
        <Title level={2}>Create New Question</Title>
      </Row>

      <Form
        {...formItemLayout}
        form={form}
        name="create_question"
        scrollToFirstError
        onFinish={handleCreateQuestion}
      >
        <Form.Item
          name="question"
          label="Question"
          rules={[
            {
              required: true,
              message: "Please input new question!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="answer1"
          label="Answer 1"
          rules={[
            {
              required: true,
              message: "Please input frist answer!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="answer2"
          label="Answer 2"
          rules={[
            {
              required: true,
              message: "Please input second answer!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="answer3"
          label="Answer 3"
          rules={[
            {
              required: true,
              message: "Please input third answer!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="answer4"
          label="Answer 4"
          rules={[
            {
              required: true,
              message: "Please input 4th answer!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="correctanswer"
          label="Correct Answer"
          rules={[
            {
              required: true,
              message: "Please input correct answer!",
            },
          ]}
        >
          <Input />
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

export default CreateQuestion;
