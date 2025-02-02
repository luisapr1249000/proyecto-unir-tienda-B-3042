import React from "react";
import Grid from "@mui/material/Grid2";
import { useMatches, useOutletContext } from "react-router-dom";
import { Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import UserAccountUpdateAvatarForm from "../../../../components/users_/account/avatar/update/UserAccountUpdateAvatarForm";
import UserUpdateForm from "../../../../components/users_/account/update/UserUpdateForm";
import UserCard from "../../../../components/users_/card/UserCard";
import { User } from "../../../../types/user";
import BackButton from "../../../../components/common/buttons/back-button/BackButton";

const UserAccountUpdate = () => {
  const matches = useMatches();
  console.log(matches);
  const authUser = useOutletContext<User>();

  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">User Account</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <UserCard user={authUser} />
        </CardContent>
        <Divider />

        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            User Avatar
          </Typography>
        </CardContent>
        <CardContent>
          <UserAccountUpdateAvatarForm />
        </CardContent>

        <Divider />
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Update User Info
          </Typography>
        </CardContent>
        <CardContent>
          <UserUpdateForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserAccountUpdate;
