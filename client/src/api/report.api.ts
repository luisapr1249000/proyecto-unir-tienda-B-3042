import { api } from "../config/axios.config";
import { Report, ReportedItemId, ReportInput } from "../types/report";
import { PaginationOptions, ReportPaginationResults } from "../types/query";

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
}: PaginationOptions): Promise<ReportPaginationResults> => {
  const response = await api<ReportPaginationResults>(
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
}: PaginationOptions & { productId: string }) => {
  const response = await api<ReportPaginationResults>(
    `/reports/products/${productId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportsFromReview = async ({
  reviewId,
  page,
  limit,
  sort,
}: PaginationOptions & { reviewId: string }) => {
  const response = await api<ReportPaginationResults>(
    `/reports/reviews/${reviewId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportsFromUser = async ({
  userId,
  page,
  limit,
  sort,
}: PaginationOptions & { userId: string }) => {
  const response = await api<ReportPaginationResults>(
    `/reports/users/${userId}?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};

export const getReportedProducts = async ({
  page,
  limit,
  sort,
}: PaginationOptions) => {
  const response = await api<ReportPaginationResults>(
    `/reports?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};
