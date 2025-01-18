import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import ChangePasswordForm from "../../../../components/users_/account/change-password/ChangePasswordForm";
import { Card, CardContent } from "@mui/material";

const ChangePassword = () => {
  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Change Password</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Update User Password
          </Typography>
        </CardContent>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChangePassword;
