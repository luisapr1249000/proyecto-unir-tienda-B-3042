import React, { ReactNode, useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ToggleableDrawer = ({
  handleOpen,
  isOpen,
  children,
}: {
  handleOpen: () => void;
  isOpen: boolean;
  children: ReactNode;
}) => {
  const drawerWidth = 250;
  const shortDrawerWidth = 60;
  return (
    <Drawer
      sx={{
        display: { xs: "none", md: "block" },
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        width: isOpen ? drawerWidth : shortDrawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? drawerWidth : shortDrawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
    >
      <Toolbar />
      <List
        sx={{ m: isOpen ? 2 : 0, height: 1 }}
        component={Paper}
        variant="outlined"
        disablePadding
      >
        <Tooltip title="Close" placement="right">
          <ListItem divider disableGutters disablePadding sx={{}}>
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 2 : 0 }}>
                {isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
              </ListItemIcon>
              <ListItemText
                sx={{ display: isOpen ? "block" : "none" }}
                primary="Close"
              />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        {children}
      </List>
    </Drawer>
  );
};

export default ToggleableDrawer;
