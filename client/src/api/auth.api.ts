import { api } from "../config/axios.config";
import {
  AuthLogin,
  AuthSignup,
  ChangePassword,
  ForgotPassword,
  LoginResponse,
  MailRequest,
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

export const verifyToken = async (token: string) => {
  const response = await api<{ isValidToken: boolean }>(
    `/auth/token/verify?token=${token}`
  );
  return response.data;
};

export const changePassword = async (data: ChangePassword) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};

export const forgotPassword = async (data: ForgotPassword) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const sendResetPasswordEmail = async (data: MailRequest) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const sendConfirmationEmail = async (data: MailRequest) => {
  const response = await api.post("/auth/confirm-email", data);
  return response.data;
};
