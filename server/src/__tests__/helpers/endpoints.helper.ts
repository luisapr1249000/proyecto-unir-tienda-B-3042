import { API_URL } from "../constants/constants";

export const createEndpoint = (endpoint: string, subpath?: string) =>
  `${API_URL}/${endpoint}${subpath ? `/${subpath}` : ""}`;

export const createQueryEndpoint = (
  fullUrl: string,
  page: string,
  limit = "10",
) => {
  return `${fullUrl}?page={${page}&limit=${limit}}`;
};
