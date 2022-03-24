import { api } from "./http.js";

export const registration = async (
  inputEmail,
  inputUsername,
  inputPassword
) => {
  return await api
    .post("/users/registration/", {
      email: inputEmail,
      username: inputUsername,
      password: inputPassword,
    })
    .then((response) => {
      alert(response.data);
    })
    .catch((error) => {
      const errorsList = [
        error.response.data.email,
        error.response.data.username,
        error.response.data.password,
      ];
      errorsList.forEach((err) => {
        if (err) {
          alert(err);
        }
      });
    });
};

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
    })
    .catch(() => {
      alert("User undefined");
    });
};

export const logout = () => {
  ["access", "refresh"].forEach((item) => localStorage.removeItem(item));
};

export const loadUser = async () => {
  return await api.get("/users/me").then((response) => response.data);
};

export const loadUsers = async (pageNumber) => {
  return await api
    .get(`/users/?page=${pageNumber}`)
    .then((response) => response.data);
};

export const activation = async (currentUID, currentToken) => {
  return await api
    .post("/users/activation/", {
      encode_uid: currentUID,
      token: currentToken,
    })
    .then((response) => {
      response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
