import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import Header from "../header/header/Header";
import { Footer } from "../footer/Footer";
import SideMenu from "../side-menu/SideMenu";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => setIsOpen((prev) => !prev);
  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <Grid
        sx={{
          display: "flex",
          // minHeight: "calc(100vh)",
        }}
      >
        <SideMenu handleOpen={handleOpenDrawer} isTemporary={isOpen} />
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
