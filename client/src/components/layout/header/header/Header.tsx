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

const Header = () => {
  const { data: authUser, isSuccess, isLoading } = useAuthUser();
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        component={Grid}
        container
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            startIcon={<HomeIcon />}
            variant="text"
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
        </Grid>
        <Grid size={{ xs: 3 }} sx={{ border: 1 }}></Grid>
        <HeaderSearchBar />
        {isLoading && <SkeletonCircle />}
        {!isLoading && isSuccess && authUser && <HeaderAuth />}
        {!isLoading && (!isSuccess || !authUser) && <HeaderAuthButtons />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
