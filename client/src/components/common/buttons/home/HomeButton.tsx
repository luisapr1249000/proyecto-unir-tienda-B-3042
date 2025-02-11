import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const HomeButton = ({
  size,
  fullWidth,
}: {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}) => (
  <Button
    size={size}
    fullWidth={fullWidth}
    endIcon={<HomeIcon />}
    component={Link}
    to="/"
    variant="contained"
  >
    Home
  </Button>
);

export default HomeButton;
