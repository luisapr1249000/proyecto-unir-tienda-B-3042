import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import UserAccountDelete from "../../../components/users/account/user-account-delete/UserAccountDelete";
import ChangePassword from "../../../components/users/account/change-password/ChangePassword";

const UserEditAccount = () => {
  return (
    <Grid sx={{ p: 1.5 }}>
      <Grid spacing={2} container sx={{ p: 3 }} size={{ xs: 11 }}>
        <Grid container size={{ xs: 12 }}>
          <Typography variant="h5">User General Information</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              User Avatar
            </Typography>
          </Divider>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ChangePassword />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserEditAccount;
