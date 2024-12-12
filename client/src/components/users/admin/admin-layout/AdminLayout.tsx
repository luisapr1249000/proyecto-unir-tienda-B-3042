import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Header from "../../../layout/header/header/Header";
import { Footer } from "../../../layout/footer/Footer";
import { Outlet } from "react-router-dom";
import AdminSideMenu from "../admin-side-menu/AdminSideMenu";

const AdminLayout = () => {
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
        <AdminSideMenu />
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
