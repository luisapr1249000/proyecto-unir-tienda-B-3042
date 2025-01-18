import { useState } from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";
import LoadSpinner from "../../../common/load-spinner/LoadSpinner";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import { green, grey, red } from "@mui/material/colors";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import DialogConfirmAction from "../../../common/confirm-delete-object/ConfirmDeleteObject";
import { User } from "../../../../types/user";
import { PaginationModel } from "../../../../types/paginationResult";
import { Link } from "../../../common/react-link/Link";

const AdminUserTable = ({
  users,
  isFetching,
  refetch,
  totalDocs,
  paginationModel,
  setPaginationModel,
}: {
  users: User[];
  isFetching: boolean;
  refetch: () => void;
  totalDocs: number;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}) => {
  const [openDrag, setOpenDrag] = useState(false);

  const deleteUser = (id: GridRowId) => {
    console.log(id);
    setOpenDrag(true);
    console.log("open dialog", openDrag);
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 150,
      renderCell: ({ value }) => (
        <Link underline="none" to={`/admin/users/${value}`}>
          {value}
        </Link>
      ),
    },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "hasConfirmedEmail",
      headerName: "Has Confirmed Email",
      width: 150,
      type: "boolean",
    },
    {
      field: "isSeller",
      headerName: "is Seller",
      width: 150,
      type: "boolean",
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      type: "dateTime",
      width: 150,
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
            deleteUser(params.id);
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

  const formattedUserData = users.map((user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    hasConfirmedEmail: user.hasConfirmedEmail,
    isSeller: user.isSeller,
    lastLogin: new Date(user.lastLogin ?? 0),
  }));

  return (
    <>
      <DialogConfirmAction
        object="User"
        onDeleteObject={() => {}}
        onCancel={() => setOpenDrag(false)}
        open={openDrag}
      />
      <DataGrid
        sx={{ p: 3 }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        loading={isFetching}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        rows={formattedUserData}
        columns={columns}
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

export default AdminUserTable;
