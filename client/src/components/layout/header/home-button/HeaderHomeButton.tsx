import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";
import { Button, Tooltip } from "@mui/material";
import { Link } from "../../../common/react-link/Link";

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
          component={Link}
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
