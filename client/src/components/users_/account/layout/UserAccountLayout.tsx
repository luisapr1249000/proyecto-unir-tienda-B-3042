import { Outlet, useOutletContext } from "react-router-dom";
import Header from "../../../layout/header/header/Header";
import { Box } from "@mui/material";
import { User } from "../../../../types/user";
import { useState } from "react";
import UserAccountDrawerMenu from "../side-menu/UserAccountDrawerMenu";
import UserAccountSideMenu from "../side-menu/UserAccountSideMenu";

const UserAccountLayout = () => {
  const authUserContext = useOutletContext<User>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setOpenDrawer((prev) => !prev);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <Box sx={{ display: "flex" }}>
        <UserAccountDrawerMenu isDrawOpen={openDrawer} user={authUserContext} />
        <UserAccountSideMenu user={authUserContext} />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default UserAccountLayout;
