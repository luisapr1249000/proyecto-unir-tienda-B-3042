import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import React from "react";
import CategoryList from "../../categories/category-list/CategoryList";
import ReactLink from "../../common/react-link/ReactLink";
import LisItemHomeButton from "../../common/buttons/home-button/LisItemHomeButton";

const SideMenu = () => {
  const drawerWidth = 250;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          height: 1,
        },
      }}
    >
      <Toolbar />
      <List>
        <LisItemHomeButton />
      </List>

      <CategoryList />
    </Drawer>
  );
};

export default SideMenu;
