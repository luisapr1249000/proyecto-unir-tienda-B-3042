import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Header from "../../../layout/header/header/Header";
import { Footer } from "../../../layout/footer/Footer";
import { Outlet } from "react-router-dom";
import ToggleableDrawerMenu from "../side-menu/ToggleableDrawerMenu";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => setIsDrawerOpen((prev) => !prev);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <Grid
        sx={{
          display: "flex",
          // minHeight: "calc(100vh)",
        }}
      >
        <ToggleableDrawerMenu
          handleDrawerOpen={handleOpenDrawer}
          handleOpen={handleOpen}
          isOpen={isOpen}
          isDrawerOpen={isDrawerOpen}
        />
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

export default AdminLayout;
