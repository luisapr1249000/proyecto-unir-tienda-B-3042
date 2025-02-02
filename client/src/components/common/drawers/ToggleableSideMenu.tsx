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

const ToggleableSideMenu = ({
  onClick,
  isSideMenuOpen,
  children,
  drawerWidth = 200,
}: {
  onClick: () => void;
  isSideMenuOpen: boolean;
  children?: ReactNode;
  drawerWidth?: number;
}) => {
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
        width: isSideMenuOpen ? drawerWidth : shortDrawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: isSideMenuOpen ? drawerWidth : shortDrawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
    >
      <Toolbar />
      <Paper sx={{ height: 1 }}>
        <List sx={{}} dense>
          <Tooltip title="Close" placement="right">
            <ListItem divider disablePadding={!isSideMenuOpen} sx={{}}>
              <ListItemButton onClick={onClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: isSideMenuOpen ? 2 : 0 }}>
                  {isSideMenuOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: isSideMenuOpen ? "block" : "none",
                    color: "text.secondary",
                  }}
                  primary="Close"
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
        {children}
      </Paper>
    </Drawer>
  );
};

export default ToggleableSideMenu;
