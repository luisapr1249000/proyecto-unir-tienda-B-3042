import { Box, Grid2, List, Toolbar } from "@mui/material";
import Header from "../../../layout/header/header/Header";
import { Outlet, useOutletContext } from "react-router-dom";
import { User } from "../../../../types/user";
import UserMenuDrawer from "../../user-menu/UserMenuDrawer";
import { useState } from "react";

const UserAccountLayout = () => {
  const authUserContext = useOutletContext<User>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setOpenDrawer((prev) => !prev);
  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <Box sx={{ display: "flex" }}>
        <UserMenuDrawer user={authUserContext} />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet context={authUserContext} />
        </Box>
      </Box>
    </>
  );
};

export default UserAccountLayout;
