import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";

export const submitAnswer = (accessToken, answers, navigate) => async () => {
  try {
    await axios.post("/v1/questions/submit", [...answers], {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    navigate("/resultquiz");
  } catch (error) {
    Modal.error({
      title: "Submit failed",
      content: "You have not completed all questions",
    });
  }
};
