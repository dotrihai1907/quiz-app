import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import {
  getQuestionSuccess,
  getQuestionsAdminSuccess,
  updateQuestionSuccess,
} from "./reducer";

export const getQuestion = (accessToken, amount) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/v1/questions?limit=${amount}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Error getting questions",
    });
  }
};

export const getQuestionsAdmin = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get("/v1/questions/edit?limit=500", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionsAdminSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Get question by admin failed",
    });
  }
};

export const updateQuestion =
  (accessToken, questionUpdate, questionIdUpdate) => async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `/v1/questions/edit/${questionIdUpdate}`,
        questionUpdate,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(updateQuestionSuccess(data));
      Modal.success({
        title: "Update question successed",
      });
    } catch (error) {
      Modal.error({
        title: "Update question failed",
      });
    }
  };

export const createQuestion = (values, accessToken, form) => async () => {
  try {
    await axios.post(
      "/v1/questions/edit",
      {
        question: values.question,
        answer1: values.answer1,
        answer2: values.answer2,
        answer3: values.answer3,
        answer4: values.answer4,
        correctanswer: values.correctanswer,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    Modal.success({
      title: "Create question successed",
    });
    form.resetFields();
  } catch (error) {}
};

export const deleteQuestion = (key, accessToken) => async () => {
  try {
    await axios.delete(`/v1/questions/edit/${key}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    Modal.success({
      title: "Delete question successed",
    });
  } catch (err) {
    Modal.error({
      title: "Delete question failed",
    });
  }
};
