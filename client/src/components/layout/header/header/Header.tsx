import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderSearchBar from "../header-search-bar/HeaderSearchBar";
import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../header-auth/HeaderAuth";
import HeaderAuthButtons from "../header-auth-buttons/HeaderAuthButtons";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReactLink from "../../../common/react-link/ReactLink";
import { Link } from "react-router-dom";
import LoadSpinner from "../../../common/load-spinner/LoadSpinner";
import SkeletonCircle from "../../../common/skeleton/SkeletonCircle";
import { useAuthUser } from "../../../../hooks/auth";
import { useEffect } from "react";
import ResponsiveButton from "../../../common/buttons/responsive-buttons/ResponsiveButton";
import ResponsiveIconButton from "../../../common/buttons/responsive-buttons/ResponsiveButton";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";

const Header = () => {
  const { data: authUser, isSuccess, isLoading } = useAuthUser();
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        component={Grid}
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          // p: { xs: 3, md: 0 },
        }}
        spacing={2}
      >
        <Grid spacing={2} container size={{ xs: 7 }} sx={{ border: 1 }}>
          <Grid
            container
            spacing={1}
            // size={{ xs: 12, sm: 2, md: 2 }}
            // sx={{
            //   justifyContent: "space-around",
            //   alignItems: "center",
            //   // border: 4,
            // }}
            // size={{ xs: 5, md: 2 }}
          >
            <IconButton
              component={ReactLink}
              to="/"
              sx={{ ...responsiveDisplayIconButtons, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* <IconButton
              component={ReactLink}
              to="/"
              sx={{ ...responsiveDisplayIconButtons, mr: 2 }}
            >
              <HomeIcon />
            </IconButton> */}
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
          <HeaderSearchBar />
        </Grid>
        <HeaderSearchBar isFullBar />
        {isLoading && <SkeletonCircle />}
        {!isLoading && isSuccess && authUser && <HeaderAuth />}
        {!isLoading && (!isSuccess || !authUser) && <HeaderAuthButtons />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
