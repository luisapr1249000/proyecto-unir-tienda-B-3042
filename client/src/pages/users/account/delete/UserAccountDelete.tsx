import React from "react";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserAccountDeleteForm from "../../../../components/users_/account/delete/UserAccountDeleteForm";

import { Card, CardContent } from "@mui/material";
const UserAccountDelete = () => {
  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Delete Account</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Delete your account permanently
          </Typography>
        </CardContent>
        <CardContent>
          <UserAccountDeleteForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserAccountDelete;
