import React from "react";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const CircleLoadingGrid = ({ message }: { message?: string }) => {
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        direction="column"
        spacing={3}
      >
        <CircularProgress color="inherit" />
        {message && <Typography variant="body2">{message} ...</Typography>}
      </Grid>
    </Grid>
  );
};

export default CircleLoadingGrid;
