import { Drawer, List, ListItem, Menu, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";

import React from "react";

const SideMenu = () => {
  const drawerWidth = 400;

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
      <Grid container size={{ xs: 12 }} sx={{ border: 1 }}>
        <List>
          <ListItem>123</ListItem>
        </List>
      </Grid>
    </Drawer>
  );
};

export default SideMenu;
