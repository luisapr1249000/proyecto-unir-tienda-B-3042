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
import UserCart from "../user-cart/UserCart";
import { useAuthUser } from "../../../../../hooks/auth";
import { isAdmin } from "../../../../../utils/utils";
import BackdropLoading from "../../../../common/loaders/BackdropLoading";
const HeaderUserMenu = () => {
  const navigate = useNavigate();
  const { data: authUser, isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminOrSellerOptions = [
    {
      label: "Post Product",
      link: `/products/create`,
      icon: <PermIdentityIcon />,
      requiresSeller: true,
    },
    {
      label: "Create Category",
      link: `/categories/create`,
      icon: <PermIdentityIcon />,
      requiresSeller: true,
    },
  ];

  const settings = [
    {
      label: "Post Product",
      link: `/products/create`,
      icon: <PermIdentityIcon />,
      requiresSeller: true,
    },
    {
      label: "Create Category",
      link: `/categories/create`,
      icon: <PermIdentityIcon />,
      requiresSeller: true,
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

  if (isLoading) return <BackdropLoading />;
  if (!authUser) return <></>;
  console.log(authUser);
  return (
    <Grid
      container
      sx={{ justifyContent: "center", alignItems: "center" }}
      spacing={1}
    >
      {isLoading ? (
        <BackdropLoading />
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
            {settings.map((setting) => {
              const authSetting = ["Create Category", "Post Product"];
              const isSellerOrAdmin =
                authUser && (isAdmin(authUser.role) || authUser.isSeller);
              console.log("isSellerOrAdmin", isSellerOrAdmin);
              if (!isSellerOrAdmin && authSetting.includes(setting.label))
                return <></>;
              else
                return (
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
                );
            })}
            {logoutItem}
          </Menu>
          <UserCart userId={authUser._id} username={authUser.username} />
        </>
      )}
    </Grid>
  );
};

export default HeaderUserMenu;
