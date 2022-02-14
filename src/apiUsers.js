import { api } from "./http.js";

export const login = async (inputEmail, inputPassword) => {
  return await api
    .post("/auth/jwt-create/", {
      email: inputEmail,
      password: inputPassword,
    })
    .then((response) => {
      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    });
};

export const logout = () => {
  ["access", "refresh"].forEach((item) => localStorage.removeItem(item));
};

export const loadUser = async () => {
  return await api.get("/users/me").then((response) => response.data);
};
