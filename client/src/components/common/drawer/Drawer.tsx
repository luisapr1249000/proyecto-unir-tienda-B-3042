import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import React, { ReactNode, useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { User } from "../../../types/user";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";

const CustomDrawer = ({ user }: { user: User }) => {
  const drawerWidth = 300;
  const shortDrawerWidth = "auto";

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen((prev) => !prev);
  const listOptions = [
    {
      label: "Actualiza tu informacion",
      link: `account/${user.username}/update`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Direcciones de Entrega",
      link: `account/${user.username}/address-directions`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Cart",
      link: `account/${user?.username}/cart`,
      icon: <ShoppingCartIcon fontSize="small" />,
    },
    {
      label: "Wishlist",
      link: `account/${user?.username}/wishlist`,
      icon: <LocalMallIcon fontSize="small" />,
    },
    {
      label: "Saved Products",
      link: `account/${user?.username}/saved-products`,
      icon: <BookmarkAddedIcon fontSize="small" />,
    },
  ];
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        width: open ? drawerWidth : shortDrawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : shortDrawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
    >
      <Toolbar />
      <List sx={{}}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
              { minHeight: 48, px: 2.5 },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
            onClick={handleOpen}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <KeyboardBackspaceIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ display: open ? "block" : "none" }}
              primary="Close"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List component="nav" disablePadding>
        {listOptions.map((option) => (
          <ListItem>
            <ListItemButton
              alignItems="center"
              component={NavLink}
              to={`/${option.link}`}
              sx={{
                // display: "flex",
                p: open ? 1 : undefined,
                bgcolor: "inherit",
                boxShadow: 1,
                "&.active": { bgcolor: "primary.light", boxShadow: 1 },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary={
                  <Typography
                    component={NavLink}
                    to={`/${option.link}`}
                    sx={{
                      "&.active": { color: "#fff" },
                      textTransform: "none",
                      textDecoration: "none",
                      color: "#000",
                    }}
                    variant="body2"
                  >
                    {option.label}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
