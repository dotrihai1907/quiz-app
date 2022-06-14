import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Row, Select } from "antd";

import { useState } from "react";

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
  const { Option } = Select;
  const [form] = Form.useForm();

  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleCreateQuestion = (values) => {
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
          <Input value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
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
          <Input value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
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
          <Input value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
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
          <Input value={answer4} onChange={(e) => setAnswer4(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="correctanswer"
          label="Correct Answer"
          rules={[
            {
              required: true,
              message: "Please choose correct answer!",
            },
          ]}
        >
          <Select placeholder="Select a option">
            <Option value={answer1} />
            <Option value={answer2} />
            <Option value={answer3} />
            <Option value={answer4} />
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginBottom: "15px" }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateQuestion;
