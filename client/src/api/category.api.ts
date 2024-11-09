import { api } from "../config/axios.config";
import { PaginationResultCategories } from "../types/paginationResult";

export const getCategories = async ({
  page = 1,
  limit = 10,
  sort = "-createdAt",
}: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<PaginationResultCategories> => {
  const response = await api(
    `/categories?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};
