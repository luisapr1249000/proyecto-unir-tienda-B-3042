import { api } from "../config/axios.config";
import {
  AuthLogin,
  AuthSignup,
  LoginResponse,
  SignupResponse,
} from "../types/auth";
import { User } from "../types/user";

export const signup = async (data: AuthSignup): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup", data);
  return response.data;
};

export const login = async (data: AuthLogin): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const getAuthUser = async (): Promise<User> => {
  const response = await api("/auth/user/me", { timeout: 1000 });
  return response.data.user;
};

export const logout = async () => {
  await api.post("/auth/logout", {});
};
