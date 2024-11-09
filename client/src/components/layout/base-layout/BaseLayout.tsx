import Grid from "@mui/material/Grid2";
import React from "react";
import Header from "../header/header/Header";
import { Footer } from "../footer/Footer";
import SideMenu from "../side-menu/SideMenu";
import { Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <Grid container sx={{ display: "flex" }}>
      <Header />
      <SideMenu />
      <Grid sx={{ flexGrow: 1, border: 1 }}>
        <Toolbar />
        <Grid container size={{ xs: 12 }} sx={{ border: 1 }}>
          <Outlet />
        </Grid>
        <Toolbar />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default BaseLayout;
