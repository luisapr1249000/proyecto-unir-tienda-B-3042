import Grid from "@mui/material/Grid2";
import React, { ReactNode, useState } from "react";
import Header from "../header/header/Header";
import { Footer } from "../footer/Footer";
import { Box, List, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import ToggleableDrawer from "../../common/drawers/ToggleableDrawer";
import ToggleableDrawerList from "../../common/drawers/lists/ToggleableDrawerList";
import HomeIcon from "@mui/icons-material/Home";
import CategoryList from "../../categories/list/CategoryList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryListDrawer from "../../categories/list/CategoryListDrawer";
import MobileToggleableDrawer from "../../common/drawers/MobileToggleableDrawer";
import PriceSlider from "../../common/sliders/PriceSlider";
import { ListItem, ListItemText } from "@mui/material";

export const ToggleableSideMenu = ({
  ...props
}: {
  handleOpen: () => void;
  handleDrawerOpen: () => void;
  isOpen: boolean;
  isDrawerOpen: boolean;
  children?: ReactNode;
}) => {
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
      <ToggleableDrawer {...props}>
        <ToggleableDrawerList isDrawOpen={props.isOpen} listItem={options} />
        <CategoryListDrawer isDrawOpen={props.isOpen} />
        {props.children}
      </ToggleableDrawer>
      <MobileToggleableDrawer
        handleOpen={props.handleDrawerOpen}
        isOpen={props.isDrawerOpen}
      >
        <ToggleableDrawerList
          isDrawOpen={props.isDrawerOpen}
          listItem={options}
        />
        <CategoryListDrawer isDrawOpen={props.isDrawerOpen} />
      </MobileToggleableDrawer>
    </>
  );
};

export const BaseLayOut = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Grid
        sx={{
          display: "flex",
        }}
      >
        {children}
        <Grid component="main" sx={{ flexGrow: 1, bgcolor: "action.hover" }}>
          <Grid sx={{}}>
            <Outlet />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

const BaseLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenSideMenu = () => setIsOpen((prev) => !prev);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />

      <Grid
        sx={{
          display: "flex",
        }}
      >
        {/* <ToggleableSideMenu
          handleDrawerOpen={handleOpenDrawer}
          handleOpen={handleOpenSideMenu}
          isOpen={isOpen}
          isDrawerOpen={isDrawerOpen}
        /> */}
        <Grid component="main" sx={{ flexGrow: 1, bgcolor: "action.hover" }}>
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
