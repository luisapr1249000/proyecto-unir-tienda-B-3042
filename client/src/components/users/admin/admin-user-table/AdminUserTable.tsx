import { useState } from "react";
import { userGetUsersWithPagination } from "../../../../hooks/user";
import {
  Alert,
  AlertTitle,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
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
import { Link as ReactLink } from "react-router-dom";
import DialogConfirmAction from "../../../common/confirm-delete-object/ConfirmDeleteObject";

const AdminUserTable = () => {
  const [openDrag, setOpenDrag] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
  });

  const deleteUser = (id: GridRowId) => {
    console.log(id);
    setOpenDrag(true);
    console.log("open dialog", openDrag);
  };
  const {
    data: users,
    isLoading,
    error,
    isError,
    isPending,
    isFetching,
    isPlaceholderData,
  } = userGetUsersWithPagination({
    limit: paginationModel.pageSize,
    page: paginationModel.page,
  });

  if (isLoading) return <LoadSpinner />;
  if (error) return <Typography>Users not found</Typography>;
  if (!users) return <Typography>Users not found</Typography>;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 150,
      renderCell: ({ value }) => (
        <Link component={ReactLink} to={`/user/${value}`}>
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
      field: "userRole",
      headerName: "User Role",
      align: "center",
      width: 100,
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

  const formattedUserData = users.docs.map((user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    hasConfirmedEmail: user.hasConfirmedEmail,
    isSeller: user.isSeller,
    lastLogin: new Date(user.lastLogin ?? 0),
    userRole: user.role,
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
        rowCount={users.totalDocs}
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
  // const headerRowOptions = ["Id", "Email", "Username", "Email Checked"];
  // const handleChangePage = (_event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(1);
  // };
  // return (
  //   <TableContainer variant="outlined" component={Paper}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           {headerRowOptions.map((option) => (
  //             <TableCell align="left">{option}</TableCell>
  //           ))}
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {users.docs.map((user) => (
  //           <TableRow key={user._id}>
  //             <TableCell component="th" scope="row">
  //               {user._id}
  //             </TableCell>
  //             <TableCell>{user.email}</TableCell>
  //             <TableCell>{user.username}</TableCell>
  //             <TableCell sx={{ border: 1 }}>
  //               {user.hasConfirmedEmail ? (
  //                 <Tooltip
  //                   title={
  //                     <Typography variant="caption">
  //                       User Has Not Confirmed Email
  //                     </Typography>
  //                   }
  //                 >
  //                   <Avatar sx={{ bgcolor: green[400] }} variant="rounded">
  //                     <CheckIcon />
  //                   </Avatar>
  //                 </Tooltip>
  //               ) : (
  //                 <Tooltip
  //                   title={
  //                     <Typography variant="caption">
  //                       User Has Not Confirmed Email
  //                     </Typography>
  //                   }
  //                 >
  //                   <Avatar sx={{ bgcolor: red[400] }} variant="rounded">
  //                     <ClearIcon />
  //                   </Avatar>
  //                 </Tooltip>
  //               )}
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //       <TableFooter>
  //         <TableRow>
  //           <TablePagination
  //             onPageChange={handleChangePage}
  //             onRowsPerPageChange={handleChangeRowsPerPage}
  //             rowsPerPage={rowsPerPage}
  //             count={users.totalDocs}
  //             page={users.page}
  //           />
  //         </TableRow>
  //       </TableFooter>
  //     </Table>
  //   </TableContainer>
  // );
};

export default AdminUserTable;
