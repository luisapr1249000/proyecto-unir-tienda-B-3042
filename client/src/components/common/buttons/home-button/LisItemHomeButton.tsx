import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { NavLink } from "react-router-dom";

const LisItemHomeButton = () => (
  <ListItem>
    <ListItemButton
      component={NavLink}
      to="/"
      sx={{ "&.active": { bgcolor: "#0002" } }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </ListItem>
);

export default LisItemHomeButton;
