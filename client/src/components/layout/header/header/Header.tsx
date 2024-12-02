import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
import SkeletonCircle from "../../../common/skeleton/SkeletonCircle";
import { useAuthUser } from "../../../../hooks/auth";
import { useEffect } from "react";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";
import { gridContainerCenter } from "../../../../assets/css/mui-css-objects/gridCenter";
import ResponsiveHeader from "./ResponsiveHeader";

const Header = () => {
  const { data: authUser, isSuccess, isLoading } = useAuthUser();
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <ResponsiveHeader
        authUser={authUser}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
      <Toolbar
        component={Grid}
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: { xs: "none", md: "flex" },
        }}
        spacing={2}
      >
        <Grid size={{ xs: 2, md: 1 }} sx={{ border: 1 }}>
          <Grid>
            <IconButton
              component={ReactLink}
              to="/"
              sx={{ ...responsiveDisplayIconButtons, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

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
        </Grid>
        <HeaderSearchBar />

        {isLoading && <SkeletonCircle />}
        {!isLoading && isSuccess && authUser && <HeaderAuth />}
        {!isLoading && (!isSuccess || !authUser) && <HeaderAuthButtons />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
