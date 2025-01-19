import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import AdminProductTable from "../../../components/users_/admin/product-table/AdminProductTable";

const AdminProducts = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const {
    data: products,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetProductsWithPagination({
    queryKey: [
      "products-admin",
      paginationModel.page,
      paginationModel.pageSize,
    ],
    limit: paginationModel.pageSize,
    page: paginationModel.page,
  });

  if (isLoading || isFetching) return <CircleLoadingGrid />;
  if (error)
    return <ObjectNotFound multiple object="Product" onReload={refetch} />;
  if (!products)
    return <ObjectNotFound multiple object="Product" onReload={refetch} />;

  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <AdminProductTable
        products={products.docs ?? []}
        isFetching={isFetching}
        totalDocs={products.totalDocs}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </Grid>
  );
};

export default AdminProducts;
