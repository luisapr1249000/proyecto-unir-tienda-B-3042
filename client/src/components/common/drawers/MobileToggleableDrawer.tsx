import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MobileToggleableDrawer = ({
  onCloseDrawer,
  isOpen,
  children,
  drawerWidth = 300,
}: {
  isOpen: boolean;
  onCloseDrawer: () => void;
  children: React.ReactNode;
  drawerWidth?: number;
}) => {
  return (
    <Drawer
      sx={{
        display: { xs: "block", md: "none" },
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={isOpen}
      onClose={onCloseDrawer}
    >
      <Toolbar />
      <List
        sx={{ height: 1 }}
        component={Paper}
        variant="outlined"
        disablePadding
      >
        <Tooltip title="Close" placement="right">
          <ListItem divider disableGutters disablePadding sx={{}}>
            <ListItemButton onClick={onCloseDrawer}>
              <ListItemIcon sx={{}}>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        {children}
      </List>
    </Drawer>
  );
};

export default MobileToggleableDrawer;
