import { Avatar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useGetProductsWithPagination } from "../../../../hooks/products.hooks";
import LoadSpinner from "../../../common/load-spinner/LoadSpinner";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import ConfirmDeleteObject from "../../../common/confirm-delete-object/ConfirmDeleteObject";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import DialogConfirmAction from "../../../common/confirm-delete-object/ConfirmDeleteObject";

const AdminProductTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 1,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsWithPagination({
    queryKey: [
      "products-admin",
      paginationModel.page,
      paginationModel.pageSize,
    ],
    limit: paginationModel.pageSize,
    page: paginationModel.page,
  });

  const deleteProduct = (id: GridRowId) => {
    setOpenDialog(true);
    console.log(id);
  };

  if (isLoading) return <LoadSpinner />;
  if (error) return <Typography>Users not found</Typography>;
  if (!products) return <Typography>Users not found</Typography>;

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "productName", headerName: "Product Name", width: 200 },
    {
      field: "productFinalPrice",
      headerName: "Product Final Price",
      width: 200,
    },
    { field: "productQuantity", headerName: "Product Quantity", width: 150 },
    { field: "averageReview", headerName: "Average Review", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",

      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete User">
              <Avatar
                sx={{
                  bgcolor: red[900],
                  height: 25,
                  width: 25,
                }}
              >
                <ClearIcon fontSize="inherit" />
              </Avatar>
            </Tooltip>
          }
          onClick={() => {
            deleteProduct(params.id);
          }}
          label="Delete"
        />,
        <GridActionsCellItem
          label="Grant Permissions"
          icon={<SecurityIcon />}
          showInMenu
        />,
        <GridActionsCellItem
          label="Edit User Information"
          icon={<EditIcon />}
          showInMenu
        />,
      ],
    },
  ];

  const formattedProductData = products.docs.map((product) => ({
    id: product._id,
    productName: product.name,
    productFinalPrice: product.finalPrice,
    productQuantity: product.quantity,
    productAverageReview: product.averageReview,
  }));

  return (
    <>
      <DialogConfirmAction
        object="Product"
        onCancel={() => setOpenDialog(false)}
        open={openDialog}
        onDeleteObject={() => {}}
      />
      <DataGrid
        loading={isLoading}
        rows={formattedProductData}
        columns={columns}
        pagination
        paginationMode="server"
        checkboxSelection
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={products.totalDocs}
      />
    </>
  );
};

export default AdminProductTable;
