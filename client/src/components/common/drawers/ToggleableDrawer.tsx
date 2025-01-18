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
  Slider,
  Box,
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
  const [value, setValue] = React.useState<number[]>([30, 50]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100000,
      label: "100000",
    },
  ];

  const valueText = (value: number) => `${value}$`;
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
        <List>
          <ListItem sx={{ display: "flex", flexDirection: "column" }}>
            <ListItemText primary="Price" />
            <Box sx={{ width: 1 }}>
              <Slider
                aria-label="Volume"
                value={value}
                getAriaValueText={valueText}
                onChange={handleChange}
                valueLabelDisplay="auto"
                marks={marks}
                max={100000}
                min={0}
              />
            </Box>
          </ListItem>
        </List>
      </List>
    </Drawer>
  );
};

export default ToggleableDrawer;
