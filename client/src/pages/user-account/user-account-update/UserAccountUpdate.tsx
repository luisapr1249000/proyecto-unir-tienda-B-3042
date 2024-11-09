import React from "react";
import Grid from "@mui/material/Grid2";
import UserUpdateForm from "../../../components/users/account/user-update/UserUpdateForm";
import { useMatches } from "react-router-dom";
import BreadCrumbs from "../../../components/common/breadcrumbs/BreadCrumbs";

const UserAccountUpdate = () => {
  const matches = useMatches();
  console.log(matches);

  return (
    <Grid
      container
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BreadCrumbs />
      <Grid spacing={4} container size={{ xs: 5 }}>
        <Grid container size={{ xs: 12 }}>
          TITLE
        </Grid>
        <UserUpdateForm />
      </Grid>
    </Grid>
  );
};

export default UserAccountUpdate;
