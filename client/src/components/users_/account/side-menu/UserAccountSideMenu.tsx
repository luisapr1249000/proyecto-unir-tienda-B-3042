import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MailIcon from "@mui/icons-material/Mail";
import { ListItemLink } from "../../../common/react-link/Link";
import { User } from "../../../../types/user";

const UserAccountSideMenu = ({ user }: { user: User }) => {
  const drawerWidth = 340;
  const shortDrawerWidth = 60;

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen((prev) => !prev);
  const listOptions = [
    {
      label: "Actualiza tu informacion",
      link: `/account/${user.username}/update`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Account Security",
      link: `/account/${user.username}/change-password`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Delete Account",
      link: `/account/${user.username}/delete-account`,
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
        display: { xs: "none", md: "block" },
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
      <List
        dense={open}
        component={open ? Paper : "div"}
        elevation={4}
        sx={{ p: open ? 3 : 0, m: open ? 3 : 0, height: "calc(100vh)" }}
      >
        <ListItem
          disableGutters
          sx={{ my: 3, display: { xs: "none", md: "block" } }}
        >
          <ListItemButton
            sx={{ justifyContent: open ? "initial" : "center" }}
            onClick={handleOpen}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 0,
              }}
            >
              <KeyboardBackspaceIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ display: open ? "block" : "none" }}
              primary="Close"
            />
          </ListItemButton>
        </ListItem>

        {listOptions.map((option) => (
          <ListItemLink
            key={option.label}
            to={option.link}
            divider={open}
            disableGutters
          >
            <ListItemButton
              sx={{ justifyContent: open ? "initial" : "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 0,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                sx={[!open && { display: "none" }]}
                primary={option.label}
              />
            </ListItemButton>
          </ListItemLink>
        ))}
      </List>
    </Drawer>
  );
};

export default UserAccountSideMenu;
