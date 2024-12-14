import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import UserAccountDelete from "../../../components/users/account/user-account-delete/UserAccountDelete";

const UserDeleteAccount = () => {
  return (
    <Grid sx={{ p: 1.5 }}>
      <Grid spacing={2} container sx={{ p: 3 }} size={{ xs: 11 }}>
        <Grid container size={{ xs: 12 }}>
          <Typography variant="h5">Delete Account</Typography>
        </Grid>

        <Divider flexItem sx={{ flexGrow: 1, my: 2 }} />

        <Grid size={{ xs: 12 }}>
          <UserAccountDelete />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDeleteAccount;
