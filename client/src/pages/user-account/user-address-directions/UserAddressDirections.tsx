import React from "react";
import Grid from "@mui/material/Grid2";

const UserAddressDirections = () => {
  return (
    <Grid
      container
      size={{ xs: 12 }}
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        size={{ xs: 5 }}
        sx={{
          p: 3,
          justifyContent: "center",
          alignItems: "center",
          border: 1,
        }}
      ></Grid>
    </Grid>
  );
};

export default UserAddressDirections;
