import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7136/api", // Cambiar esto según tu URL base
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    if (error.response && error.response.status === 403) {
    //  alert("No tienes permiso");
    }

    return Promise.reject(error);
  }
);

export default api;
