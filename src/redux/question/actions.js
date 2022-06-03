import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { getQuestionSuccess } from "./reducer";

export const getQuestion = (accessToken, amount) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/v1/questions?limit=${amount}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Error getting questions",
      content: error.response.data.message,
    });
  }
};
