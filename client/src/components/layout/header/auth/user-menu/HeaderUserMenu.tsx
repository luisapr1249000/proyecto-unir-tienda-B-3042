import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../../api/auth.api";
import LoadSpinner from "../../../../common/load-spinner/LoadSpinner";
import { User } from "../../../../../types/user";
import UserCart from "../user-cart/UserCart";
const HeaderUserMenu = () => {
  const navigate = useNavigate();
  const { data: authUser, isLoading } = useQuery<User>({
    queryKey: ["authUser"],
  });
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const settings = [
    {
      label: "Post Product",
      link: `/products/create`,
      icon: <PermIdentityIcon />,
    },
    {
      label: "Create Category",
      link: `/categories/create`,
      icon: <PermIdentityIcon />,
    },
    {
      label: "Account",
      link: `/users/${authUser?.username}/update`,
      icon: <SettingsIcon />,
    },
    {
      label: "Cart",
      link: `/users/${authUser?.username}/cart`,
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Wishlist",
      link: `/users/${authUser?.username}/wishlist`,
      icon: <LocalMallIcon />,
    },
  ];

  console.log("data user from header auth :", authUser);

  const logoutFunction = async () => {
    queryClient.setQueryData(["authUser"], null);
    handleClose();
    await logout();
    navigate("/");
  };
  const logoutItem = (
    <MenuItem onClick={logoutFunction}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <Typography variant="body2">Logout</Typography>
    </MenuItem>
  );
  return (
    <Grid
      // size={{}}
      container
      sx={{ justifyContent: "center", alignItems: "center" }}
      spacing={1}
    >
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <>
          <IconButton size="small" onClick={handleMenu} color="inherit">
            <Avatar sx={{ width: 35, height: 35 }} alt="Remy Sharp" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            {settings.map((setting) => (
              <MenuItem
                component={Link}
                to={setting.link}
                onClick={handleClose}
                divider
                key={setting.label}
              >
                <ListItemIcon>{setting.icon}</ListItemIcon>
                <Typography variant="body2">{setting.label}</Typography>
              </MenuItem>
            ))}
            {logoutItem}
          </Menu>
          <UserCart />
        </>
      )}
    </Grid>
  );
};

export default HeaderUserMenu;
