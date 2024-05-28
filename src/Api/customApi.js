import axios from "axios";
const customAxios = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

customAxios.defaults.withCredentials = true;

customAxios.interceptors.request.use(
  function (config) {
    // Add Authorization header with Bearer token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // config.headers.token = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default customAxios;
