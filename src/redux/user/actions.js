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

export const createUser = (values, accessToken, form) => async () => {
  try {
    await axios.post(
      "/v1/users",
      {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    Modal.success({
      title: "Create successed",
    });
    form.resetFields();
  } catch (error) {
    Modal.error({
      title: "Create failed",
      content: error.response.data.message,
    });
  }
};
