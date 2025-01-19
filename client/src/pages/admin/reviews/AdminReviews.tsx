import React, { useState } from "react";
import { useGetReviewsWithPagination } from "../../../hooks/review.hooks";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import AdminReviewTable from "../../../components/users_/admin/review-table/AdminReviewTable";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";

const AdminReviews = () => {
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
  } = useGetReviewsWithPagination({
    queryKey: ["reviews-admin", paginationModel.page, paginationModel.pageSize],
    limit: paginationModel.pageSize,
    page: paginationModel.page,
    isKeepPreviousData: true,
  });

  if (isLoading || isFetching) return <CircleLoadingGrid />;
  if (error)
    return <ObjectNotFound multiple object="Product" onReload={refetch} />;
  if (!products)
    return <ObjectNotFound multiple object="Product" onReload={refetch} />;
  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <AdminReviewTable
        isFetching={isFetching}
        refetch={refetch}
        totalDocs={products.totalDocs}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        reviews={products.docs}
      />
    </Grid>
  );
};

export default AdminReviews;
