import { api } from "../config/axios.config";
import { ProductId } from "../types/product";
import { ProductReport, ProductReportInput } from "../types/productReport";

export const createReport = async ({
  productId,
  reason,
}: ProductId & ProductReportInput): Promise<ProductReport> => {
  const res = await api.post<ProductReport>(`/products/${productId}/reports`, {
    reason,
  });
  return res.data;
};
