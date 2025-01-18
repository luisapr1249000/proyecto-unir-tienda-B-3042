import { api } from "../config/axios.config";
import {
  PaginationConfig,
  PaginationResultReports,
} from "../types/paginationResult";
import {
  Report,
  ReportedItemId,
  ReportInput,
  ReportResolution,
} from "../types/report";

export const createReport = async ({
  reportedItemId,
  ...data
}: ReportInput & ReportedItemId): Promise<Report> => {
  const response = await api.post<Report>(`/reports/${reportedItemId}`, data);
  return response.data;
};

export const updateReport = async ({
  reportedItemId,
  ...data
}: ReportInput & ReportedItemId) => {
  const response = await api.put<Report>(`/reports/${reportedItemId}`, data);
  return response.data;
};

export const deleteReport = async (reportedId: string) => {
  await api.delete(`/reports/${reportedId}`);
};

export const getReportsWithPagination = async ({
  page,
  limit,
  sort,
}: PaginationConfig): Promise<PaginationResultReports> => {
  const response = await api<PaginationResultReports>(
    `/reports?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getReportById = async (reportId: string) => {
  const response = await api<Report>(`/reports/${reportId}`);
  return response.data;
};

export const getReportsFromProduct = async ({
  productId,
  page,
  limit,
  sort,
}: PaginationConfig & { productId: string }) => {
  const response = await api<PaginationResultReports>(
    `/reports/products/${productId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportsFromReview = async ({
  reviewId,
  page,
  limit,
  sort,
}: PaginationConfig & { reviewId: string }) => {
  const response = await api<PaginationResultReports>(
    `/reports/reviews/${reviewId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportsFromUser = async ({
  userId,
  page,
  limit,
  sort,
}: PaginationConfig & { userId: string }) => {
  const response = await api<PaginationResultReports>(
    `/reports/users/${userId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportedProducts = async ({
  page,
  limit,
  sort,
}: PaginationConfig) => {
  const response = await api<PaginationResultReports>(
    `/reports?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};
