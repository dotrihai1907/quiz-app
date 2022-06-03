import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { loginSuccess, refreshSuccess } from "./reducer";

export const register = (values, form) => async () => {
  try {
    await axios.post("/v1/auth/register", {
      email: values.email,
      username: values.username,
      password: values.password,
    });
    Modal.success({
      title: "Register successed",
    });
    form.resetFields();
  } catch (error) {
    Modal.error({
      title: "Register failed",
      content: error.response.data.message,
    });
  }
};

export const login = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post("/v1/auth/login", {
      username: values.username,
      password: values.password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Login failed",
      content: error.response.data.message,
    });
  }
};

export const refresh = (refreshToken) => async (dispatch) => {
  const { data } = await axios.post("/v1/auth/refresh-tokens", {
    refreshToken,
  });
  dispatch(refreshSuccess(data));
};
