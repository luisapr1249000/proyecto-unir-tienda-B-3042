import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

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
import { logout } from "../../../../api/auth.api";
import { User } from "../../../../types/user";
import { Link } from "react-router-dom";
const HeaderAuth = () => {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });
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
      label: "Profile",
      link: `/profile/${authUser?.username}`,
      icon: <PermIdentityIcon />,
    },
    {
      label: "Account",
      link: `/account/${authUser?.username}`,
      icon: <SettingsIcon />,
    },
    {
      label: "Cart",
      link: `/account/${authUser?.username}`,
      icon: <ShoppingCartIcon />,
    },
  ];

  console.log("data user from header auth :", authUser);

  const logoutFunction = async () => {
    queryClient.setQueryData(["authUser"], null);
    handleClose();
    await logout();
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
      size={{ xs: 3 }}
      container
      sx={{ justifyContent: "flex-end", alignItems: "center" }}
    >
      <IconButton size="large" onClick={handleMenu} color="inherit">
        <Avatar alt="Remy Sharp" />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
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
    </Grid>
  );
};

export default HeaderAuth;
