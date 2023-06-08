import instance from "./instance";

export const getAllBanner = () => {
  return instance.get("Banrer");
};
