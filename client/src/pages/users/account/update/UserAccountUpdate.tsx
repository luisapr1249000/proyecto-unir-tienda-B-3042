import React from "react";
import Grid from "@mui/material/Grid2";
import { useMatches, useOutletContext } from "react-router-dom";
import { Card, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import UserAccountUpdateAvatarForm from "../../../../components/users_/account/avatar/update/UserAccountUpdateAvatarForm";
import UserUpdateForm from "../../../../components/users_/account/update/UserUpdateForm";

const UserAccountUpdate = () => {
  const matches = useMatches();
  console.log(matches);
  //   const context = useOutletContext<User>();

  return (
    <Grid
      // container
      sx={{
        // height: "calc(100vh)",
        // justifyContent: "center",
        // alignItems: "center",
        p: 1.5,
      }}
    >
      <Grid
        // component={Card}
        // variant="outlined"
        spacing={2}
        container
        sx={{ p: 3 }}
        size={{ xs: 11 }}
      >
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

        {/* <Grid size={{ xs: 12 }}>
          <UserProfileCard user={context} />
        </Grid> */}
        <UserAccountUpdateAvatarForm />
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              User Info
            </Typography>
          </Divider>
        </Grid>
        <UserUpdateForm />
      </Grid>
    </Grid>
  );
};

export default UserAccountUpdate;
