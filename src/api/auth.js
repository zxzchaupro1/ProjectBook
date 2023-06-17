import instance from "./instance";

export const loginApi = (data) => {
  return instance.post("/login", data);
};
export const updateProfileApi = (id, data) => {
  return instance.pacth(`users/${id}`, data);
};
