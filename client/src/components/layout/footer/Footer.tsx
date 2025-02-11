import { Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Grid
      component="footer"
      size={{ xs: 12, md: 6 }}
      container
      spacing={2}
      sx={{ bgcolor: "background.paper", p: 3 }}
    >
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography color="textSecondary" variant="h6" gutterBottom>
          Web App made By Luis Angel Palacios Ramirez
        </Typography>
        <Typography color="textSecondary" variant="body2">
          &#169; 2024 MyCompany. All rights reserved
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Link to="">
          <TwitterIcon color="primary" sx={{ mr: 2 }} />
        </Link>
        <Link to="">
          <FacebookIcon color="primary" />
        </Link>
      </Grid>
    </Grid>
  );
};
