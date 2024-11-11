import axios from "axios";
import { API_BASE } from "../constants";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
