import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ContainerLoader = ({ message }: { message?: string }) => {
  return (
    <Grid
      direction="column"
      container
      sx={{
        p: 3,
        height: 1,
        width: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      {message && <Typography variant="body2">{message} ...</Typography>}
    </Grid>
  );
};

export default ContainerLoader;
