import React from "react";
import Grid from "@mui/material/Grid2";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { Card, CardContent, Typography } from "@mui/material";

const NetworkOffline = () => {
  return (
    <Grid container sx={[gridContainerCenter, { height: "calc(100vh)" }]}>
      <Card variant="outlined" component={Grid} size={{ xs: 6 }}>
        <CardContent
          container
          direction="column"
          component={Grid}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", alignContent: "center" }}
          >
            <WifiOffIcon color="primary" sx={{ fontSize: 300 }} />
          </Grid>
          <Typography textAlign="center" gutterBottom variant="h5">
            It seems like you're offline
          </Typography>
          <Typography textAlign="center" variant="body2" color="textSecondary">
            Please check your network or connect to a stable internet
            connection!
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NetworkOffline;
