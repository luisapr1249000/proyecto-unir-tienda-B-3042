import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import AdminUserTable from "../../../components/users/admin/admin-user-table/AdminUserTable";

const AdminUsers = () => {
  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <AdminUserTable />
    </Grid>
  );
};

export default AdminUsers;
