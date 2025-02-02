import { Alert, AlertTitle, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const SoldOutProduct = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Alert severity="warning">
        <AlertTitle>
          <Typography variant="h6">Product No Longer Available</Typography>
        </AlertTitle>
        <Typography gutterBottom variant="body2" color="textSecondary">
          Try to look up another one
        </Typography>
      </Alert>
    </Grid>
  );
};

export default SoldOutProduct;
