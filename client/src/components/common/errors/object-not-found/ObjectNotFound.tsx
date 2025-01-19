import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import RefetchButton from "../../buttons/refetch/RefetchButton";
import HomeButton from "../../buttons/home/HomeButton";
import { yellow } from "@mui/material/colors";

const ObjectNotFound = ({
  object = "Page",
  multiple = false,
  message = "Try looking up other or Go home",
  onReload,
}: {
  onReload: () => void;
  object?: string;
  multiple?: boolean;
  message?: string;
}) => (
  <Grid
    container
    sx={{
      height: "calc(100vh)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Card
      variant="outlined"
      component={Grid}
      size={{ xs: 11, md: 12 }}
      direction="column"
      container
    >
      <CardContent sx={{ textAlign: "center" }}>
        <ErrorIcon sx={{ fontSize: 200, color: yellow[700] }} />
        <Typography gutterBottom variant="h6" component="div">
          {`${object}${multiple ? "s" : ""} Not Found`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {message}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        sx={{ justifyContent: "center", alignItems: "center", p: 3 }}
      >
        <RefetchButton size="small" onRefetch={onReload} />
        <HomeButton size="small" />
      </CardActions>
    </Card>
  </Grid>
);

export default ObjectNotFound;
