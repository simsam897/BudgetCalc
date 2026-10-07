import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    console.log("req send");

    return config;
  },
  (error) => {
    console.log("request error", error.message);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },

  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("unauthorized || forbidden");
    }

    return Promise.reject(error);
  },
);

export default API;
