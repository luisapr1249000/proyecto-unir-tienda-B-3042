import React from "react";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const CircleLoadingGrid = ({ message }: { message?: string }) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh)",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh)",
          width: "100%",
        }}
        direction="column"
        spacing={3}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body2">{message ?? ""}</Typography>
      </Grid>
    </Grid>
  );
};

export default CircleLoadingGrid;
