import { AppBar, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import HeaderSearchBar from "../header-search-bar/HeaderSearchBar";
import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../header-auth/HeaderAuth";
import HeaderAuthButtons from "../header-auth-buttons/HeaderAuthButtons";

const Header = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const headerNoAuth = (
    <Grid size={{ xs: 3 }} sx={{ border: 1 }}>
      3
    </Grid>
  );

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
        <Grid size={{ xs: 3 }} sx={{ border: 1 }}>
          1
        </Grid>
        <HeaderSearchBar />
        {/* {authUser ? <HeaderAuth /> : headerNoAuth} */}
        <HeaderAuth />
        <HeaderAuthButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
