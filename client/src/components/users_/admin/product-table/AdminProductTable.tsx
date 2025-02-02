import { Avatar, Link, Rating, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Link as ReactLink } from "react-router-dom";
import DialogConfirmAction from "../../../common/dialogs/dialog-confirm-action/DialogConfirmAction";
import { Product } from "../../../../types/product";

const AdminProductTable = ({
  products,
  totalDocs,
  isFetching,
  paginationModel,
  setPaginationModel,
}: {
  isFetching: boolean;
  products: Product[];
  totalDocs: number;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 0.4,

      renderCell: (params) => (
        <Link to={`/products/item/${params.id}`} component={ReactLink}>
          {params.id}
        </Link>
      ),
    },
    { field: "productName", headerName: "Product Name" },
    {
      field: "productFinalPrice",
      headerName: "Product Final Price",
      width: 200,
    },
    { field: "productQuantity", headerName: "Product Quantity", width: 150 },
    {
      field: "averageReview",
      headerName: "Average Review",
      width: 150,
      renderCell: (params) => <Rating readOnly value={params.value} />,
    },
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
          label="Edit Product Information"
          icon={<EditIcon />}
          showInMenu
        />,
      ],
    },
  ];

  const formattedProductData = products.map((product) => ({
    id: product._id,
    productName: product.name,
    productFinalPrice: product.finalPrice,
    productQuantity: product.quantity,
    productAverageReview: product.averageReview,
  }));

  return (
    <>
      <DialogConfirmAction
        onClose={() => {}}
        open={openDialog}
        onDeleteObject={() => {}}
      />
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
        rows={formattedProductData}
        columns={columns}
        pagination
        loading={isFetching}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={totalDocs}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
          toolbar: { showQuickFilter: true },
        }}
      />
    </>
  );
};

export default AdminProductTable;
