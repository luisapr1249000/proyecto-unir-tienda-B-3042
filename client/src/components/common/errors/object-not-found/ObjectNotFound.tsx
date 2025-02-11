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

export const ObjectNotFoundCard = ({
  onReload,
  iconFontSize = 80,
  multiple = false,
  object = "Page",
  message,
  icon,
}: {
  onReload: () => void;
  object?: string;
  multiple?: boolean;
  message?: string;
  iconFontSize?: number;
  icon?: JSX.Element;
}) => (
  <Card elevation={6} sx={{}}>
    <CardContent sx={{ textAlign: "center" }}>
      {icon ? icon : <ErrorIcon sx={{ fontSize: iconFontSize }} />}
      <Typography gutterBottom variant="h6">
        {`${object}${multiple ? "s" : ""} Not Found`}
      </Typography>
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
    </CardContent>
    <Divider />
    <CardActions sx={{ justifyContent: "center", alignItems: "center", p: 3 }}>
      <RefetchButton size="small" onRefetch={onReload} />
      <HomeButton size="small" />
    </CardActions>
  </Card>
);

export const GridObjectNotFound = (props: {
  onReload: () => void;
  object?: string;
  multiple?: boolean;
  message?: string;
  height?: number;
}) => (
  <Grid
    sx={{
      height: "calc(100vh - 64px)",
      // border: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    container
  >
    <ObjectNotFoundCard {...props} />
  </Grid>
);
