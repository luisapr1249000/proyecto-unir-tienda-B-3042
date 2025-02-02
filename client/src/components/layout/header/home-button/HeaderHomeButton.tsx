import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

import { BorderIconButton } from "../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { Link } from "../../../common/react-link/Link";

const HeaderHomeButton = ({
  handleClickDrawer,
}: {
  handleClickDrawer: () => void;
}) => {
  return (
    <Grid container spacing={2} size={{ xs: "auto", md: 2 }}>
      <BorderIconButton
        onClick={handleClickDrawer}
        size="small"
        tooltipTitle="Menu"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </BorderIconButton>
      <Link to="/" underline="none">
        <BorderIconButton
          onClick={handleClickDrawer}
          size="small"
          tooltipTitle="Home"
        >
          <HomeIcon />
        </BorderIconButton>
      </Link>
    </Grid>
  );
};

export default HeaderHomeButton;
