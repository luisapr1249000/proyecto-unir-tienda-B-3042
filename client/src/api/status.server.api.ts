import { api } from "../config/axios.config";

export const getServerStatus = async () => {
  const response = await api("/health");
  return response.data;
};
