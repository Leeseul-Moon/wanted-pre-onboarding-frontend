import axios from "axios";

// const ACCESS_TOKEN = localStorage.getItem("accessToken");

// baseURL: process.env.REACT_BASE_URL,
export const instance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const onSignUp = async (sendData) => {
  return await instance.post(`/auth/signup`, sendData);
};

export const onLogin = async (sendData) => {
  return await instance.post(`/auth/signin`, sendData);
};
