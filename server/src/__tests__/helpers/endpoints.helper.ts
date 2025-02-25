import { API_URL } from "../constants/constants";

export const createEndpoint = (endpoint: string, subpath?: string) =>
  `${API_URL}/${endpoint}${subpath ? `/${subpath}` : ""}`;

export const concatEndpoints = (endpoint: string, subpath: string) =>
  `${endpoint}/${subpath}`;

export const createQueryEndpoint = (
  fullUrl: string,
  page: string,
  limit = "10",
) => `${fullUrl}?page=${page}&limit=${limit}`;
