import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 1000,
  // withCredentials: true,
  // credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers["Authorization"] = "Bearer " + access;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await api
            .post("/auth/jwt-refresh/", {
              refresh: localStorage.getItem("refresh"),
            })
            .then((response) => {
              return response;
            });
          const newTokens = rs.data;
          localStorage.setItem("access", newTokens.access);
          localStorage.setItem("refresh", newTokens.refresh);
          api.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access");
          return api(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
