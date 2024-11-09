import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

export const Footer = () => {
  return (
    <Grid
      component="footer"
      size={{ xs: 12 }}
      container
      spacing={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "background.paper",
        // p: 6,
        border: 1,
        position: "fixed",
        bottom: 0,
      }}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6" gutterBottom>
          My Company
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
      </Grid>
    </Grid>
  );
};
