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

const SideMenu = () => {
  const drawerWidth = 250;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <CategoryList />
    </Drawer>
  );
};

export default SideMenu;
