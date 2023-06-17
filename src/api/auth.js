import instance from "./instance";

export const loginApi = (data) => {
  return instance.post("/login", data);
};

export const registerApi = (data) => {
  return instance.post("/register", data);
};
export const updateProfileApi = (id, data) => {
  return instance.pacth(`users/${id}`, data);
};
