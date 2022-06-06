import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { getUsersSuccess } from "./reducer";

export const getUsers = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get("/v1/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Get users failed",
      content: error.response.data.message,
    });
  }
};
