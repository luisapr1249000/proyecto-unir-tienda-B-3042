import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography, Paper, Card, CardContent } from "@mui/material";
import UserOverviewCard from "../../../../components/users_/account/overview/UserOverview";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../types/user";
const UserAccountOverview = () => {
  const authUserContext = useOutletContext<User>();

  return (
    <Grid container spacing={3} size={{ xs: 10 }} sx={{ p: 3 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">User Overview</Typography>
        </CardContent>
        <Divider />

        <UserOverviewCard user={authUserContext} />
      </Card>
    </Grid>
  );
};

export default UserAccountOverview;
