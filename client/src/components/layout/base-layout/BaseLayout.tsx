import Grid from "@mui/material/Grid2";
import React from "react";
import Header from "../header/header/Header";
import { Footer } from "../footer/Footer";
import SideMenu from "../side-menu/SideMenu";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <>
      <Header />
      <Grid
        sx={{
          display: "flex",
          // minHeight: "calc(100vh)",
        }}
      >
        <SideMenu />
        <Grid component="main" sx={{ flexGrow: 1 }}>
          <Grid sx={{}}>
            <Outlet />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default BaseLayout;
