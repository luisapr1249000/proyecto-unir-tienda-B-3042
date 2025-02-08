import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ContainerCircleLoader = ({ message }: { message?: string }) => {
  return (
    <Grid
      direction="column"
      container
      spacing={3}
      sx={{
        p: 3,
        height: 1,
        width: 1,
        justifyContent: "center",
        alignItems: "center",
        // border: 1,
      }}
    >
      <CircularProgress />
      {message && (
        <Typography color="textSecondary" variant="caption">
          {message} ...
        </Typography>
      )}
    </Grid>
  );
};

export default ContainerCircleLoader;
