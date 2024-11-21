import React from "react";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";

const ServerDownMessage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <Grid container sx={{ p: 3 }}>
      <Grid>
        <Typography gutterBottom variant="h4" sx={{ color: "#721c24" }}>
          Server Unreachable
        </Typography>
        <Typography variant="body1" sx={{ color: "#721c24", marginBottom: 3 }}>
          We're unable to connect to the server. Please check your internet
          connection or try again later.
        </Typography>
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServerDownMessage;
