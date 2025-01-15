import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import ChangePasswordForm from "../../../../components/users_/account/change-password/ChangePasswordForm";

const ChangePassword = () => {
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
          <ChangePasswordForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
