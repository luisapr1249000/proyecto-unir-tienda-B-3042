import Grid from "@mui/material/Grid2";
import { CircularProgress } from "@mui/material";

const IconLoader = ({ size = 20 }: { size?: number }) => {
  return (
    <Grid container sx={{ p: 0.5, mb: 0.5 }}>
      <CircularProgress size={size} color="inherit" />
    </Grid>
  );
};

export default IconLoader;
