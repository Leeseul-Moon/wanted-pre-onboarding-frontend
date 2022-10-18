import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

// baseURL: process.env.REACT_BASE_URL,
export const instance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    if (ACCESS_TOKEN) {
      config.headers["Authorization"] = ACCESS_TOKEN;
    } else {
      config.headers["Authorization"] = localStorage.getItem("accessToken");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const onSignUp = async (sendData) => {
  return await instance.post(`/auth/signup`, sendData);
};

export const onLogin = async (sendData) => {
  return await instance.post(`/auth/signin`, sendData);
};

export const todoGet = async () => {
  return await instance.get(`/todos`);
};

export const todoCreate = async (todo) => {
  return await instance.post(`/todos`, todo);
};

export const todoUpdate = async (sendData) => {
  const { id } = sendData;
  const requestBody = { todo: sendData.todo, isCompleted: sendData.isCompleted };
  return await instance.put(`/todos/${id}`, requestBody);
};

export const todoDelete = async (id) => {
  return await instance.delete(`/todos/${id}`);
};
