import { api } from "../config/axios.config";
import { AuthLogin, AuthSignup } from "../types/auth";
import { User } from "../types/user";

export const signup = async (data: AuthSignup) => {
  const response = await api.post<{ userSaved: User; accessToken: string }>(
    "/auth/signup",
    data
  );
  return response.data;
};

export const login = async (data: AuthLogin) => {
  const response = await api.post<{ userId: string }>("/auth/login", data);
  return response.data;
};

export const getAuthUser = async (): Promise<User> => {
  const response = await api("/auth/user/me");
  return response.data.user;
};

export const logout = async () => {
  await api.post("/auth/logout", {});
};
