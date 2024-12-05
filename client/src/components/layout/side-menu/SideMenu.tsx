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

const SideMenu = ({
  handleOpen,
  isTemporary,
}: {
  handleOpen: () => void;
  isOpen: boolean;
}) => {
  const drawerWidth = 250;

  return (
    <Drawer
      open={isTemporary}
      onClose={handleOpen}
      variant={isTemporary ? "temporary" : "permanent"}
      sx={{
        display: { xs: isTemporary ? "flex" : "none", md: "flex" },
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
