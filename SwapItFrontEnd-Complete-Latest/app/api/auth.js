import { create } from "apisauce";

const apiAuthClient = create({
  baseURL: "",
});

const addUserClient = create({
  baseURL: "",
});

const login = (email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url =
    "/";

  return apiAuthClient.post(url, data);
};

const register = (name, email, password) => {
  const data = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url = "/";

  return apiAuthClient.post(url, data);
};

const addUser = (token, localId, name) => {
  const data = {
    name: name,
    localId: localId,
  };
  return addUserClient.post("/users.json?auth=" + token, data);
};

export default {
  login,
  register,
  addUser,
};
