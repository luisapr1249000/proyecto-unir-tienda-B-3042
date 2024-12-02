import React from "react";
import Header from "../layout/header/header/Header";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../layout/footer/Footer";
import Grid from "@mui/material/Grid2";

const AuthLayout = () => {
  return (
    <Grid sx={{ minHeight: "calc(100vh)" }} direction="column" container>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </Grid>
  );
};

export default AuthLayout;
