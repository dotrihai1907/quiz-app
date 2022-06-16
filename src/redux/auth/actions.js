import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import {
  loading,
  loadingDone,
  loginSuccess,
  refreshSuccess,
  logoutSuccess,
} from "./reducer";

export const register = (values, form) => async (dispatch) => {
  dispatch(loading());
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
  } finally {
    dispatch(loadingDone());
  }
};

export const login = (values) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.post("/v1/auth/login", {
      username: values.username,
      password: values.password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Login failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const refresh = (refreshToken) => async (dispatch) => {
  const { data } = await axios.post("/v1/auth/refresh-tokens", {
    refreshToken,
  });
  dispatch(refreshSuccess(data));
};

export const logout = (refreshToken) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post("/v1/auth/logout", {
      refreshToken,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    Modal.error({
      title: "Logout failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};
