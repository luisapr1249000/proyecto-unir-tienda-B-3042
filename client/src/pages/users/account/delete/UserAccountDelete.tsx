import React from "react";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserAccountDeleteForm from "../../../../components/users_/account/delete/UserAccountDeleteForm";

const UserAccountDelete = () => {
  return (
    <Grid sx={{ p: 1.5 }}>
      <Grid spacing={2} container sx={{ p: 3 }} size={{ xs: 11 }}>
        <Grid container size={{ xs: 12 }}>
          <Typography variant="h5">Delete Account</Typography>
        </Grid>

        <Divider flexItem sx={{ flexGrow: 1, my: 2 }} />

        <Grid size={{ xs: 12 }}>
          <UserAccountDeleteForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserAccountDelete;
