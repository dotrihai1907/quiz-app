import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";

import { calculateScore } from "../auth/reducer";

export const submitAnswer =
  (accessToken, answers, navigate) => async (dispatch) => {
    try {
      const { data } = await axios.post("/v1/questions/submit", [...answers], {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(calculateScore(data));
      navigate("/resultquiz");
    } catch (error) {
      Modal.error({
        title: "Submit failed",
        content: "You have not completed all questions",
      });
    }
  };
