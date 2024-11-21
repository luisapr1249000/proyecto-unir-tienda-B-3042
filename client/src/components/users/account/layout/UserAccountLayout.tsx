import { Box, Grid2, List, Toolbar } from "@mui/material";
import React from "react";
import Header from "../../../layout/header/header/Header";
import CustomDrawer from "../../../common/drawer/Drawer";
import { Outlet, useOutletContext } from "react-router-dom";
import UserAccountSideMenu from "../user-account-side-menu/UserAccountSideMenu";
import { User } from "../../../../types/user";

const UserAccountLayout = () => {
  const context = useOutletContext<User>();
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <CustomDrawer user={context} />
      <Box sx={{ flexGrow: 1, border: 1 }}>
        <Toolbar />
        <Outlet context={context} />
      </Box>
    </Box>
  );
};

export default UserAccountLayout;
