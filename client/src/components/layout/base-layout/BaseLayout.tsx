import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import Header from "../header/header/Header";
import { Footer } from "../footer/Footer";
import SideMenu from "../side-menu/SideMenu";
import { Box, List, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import ToggleableDrawer from "../../common/drawers/ToggleableDrawer";
import ToggleableDrawerList from "../../common/drawers/lists/ToggleableDrawerList";
import HomeIcon from "@mui/icons-material/Home";
import CategoryList from "../../categories/list/CategoryList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryListDrawer from "../../categories/list/CategoryListDrawer";

const BaseLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenDrawer = () => setIsOpen((prev) => !prev);
  const options = [
    {
      label: "Home",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Productos",
      link: "/products",
      icon: <ShoppingCartIcon />,
    },
  ];
  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <Grid
        sx={{
          display: "flex",
          // minHeight: "calc(100vh)",
        }}
      >
        <ToggleableDrawer handleOpen={handleOpenDrawer} isOpen={isOpen}>
          <ToggleableDrawerList isDrawOpen={isOpen} listItem={options} />
          <CategoryListDrawer isDrawOpen={isOpen} />
        </ToggleableDrawer>
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
