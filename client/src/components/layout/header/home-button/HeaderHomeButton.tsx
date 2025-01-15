import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReactLink from "../../../common/react-link/ReactLink";
import { Link } from "react-router-dom";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";
import { Button, Tooltip } from "@mui/material";

const HeaderHomeButton = ({
  handleClickDrawer,
}: {
  handleClickDrawer: () => void;
}) => {
  return (
    <Grid container size={{ xs: 3, md: 1 }} sx={{}}>
      <Tooltip title="Menu">
        <IconButton
          onClick={handleClickDrawer}
          sx={{ ...responsiveDisplayIconButtons, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Home">
        <IconButton
          component={ReactLink}
          to="/"
          sx={{ ...responsiveDisplayIconButtons, mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Button
        sx={{ ...responsiveDisplay }}
        startIcon={<HomeIcon />}
        variant="text"
        color="inherit"
        component={Link}
        to="/"
      >
        Home
      </Button>
    </Grid>
  );
};

export default HeaderHomeButton;
