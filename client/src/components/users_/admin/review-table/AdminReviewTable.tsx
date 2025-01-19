import React from "react";
import { Review } from "../../../../types/review";
import { PaginationModel } from "../../../../types/paginationResult";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Rating } from "@mui/material";

const AdminReviewTable = ({
  reviews,
  isFetching,
  totalDocs,
  paginationModel,
  setPaginationModel,
}: {
  reviews: Review[];
  isFetching: boolean;
  totalDocs: number;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}) => {
  const formattedReviewData = reviews.map((review) => ({
    id: review._id,
    productName: review.product.name,
    review: review.review,
    content: review.content,
    createdAt: new Date(review.createdAt),
    updatedAt: new Date(review.updatedAt),
  }));

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      //   width: 0.4,
    },
    {
      field: "productName",
      headerName: "Product Name",
      //   width: 150,
    },
    {
      field: "review",
      headerName: "Review",
      //   width: 150,
      renderCell: (params) => <Rating readOnly value={params.value} />,
    },
    { field: "content", headerName: "Content", width: 150 },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      //   width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "dateTime",
      //   width: 150,
    },
  ];

  return (
    <DataGrid
      sx={{
        p: 3,
        width: 1,
        "& .MuiDataGrid-columnHeader": {
          bgcolor: "divider",
        },
      }}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      loading={isFetching}
      rows={formattedReviewData}
      columns={columns}
      pagination
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5, 10, 25, 50]}
      rowCount={totalDocs}
      slots={{ toolbar: GridToolbar }}
    />
  );
};

export default AdminReviewTable;
