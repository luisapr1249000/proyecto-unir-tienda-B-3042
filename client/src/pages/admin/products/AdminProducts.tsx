import React from "react";
import Grid from "@mui/material/Grid2";

import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import AdminProductTable from "../../../components/users/admin/admin-product-table/AdminProductTable";

const AdminProducts = () => {
  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <AdminProductTable />
    </Grid>
  );
};

export default AdminProducts;
