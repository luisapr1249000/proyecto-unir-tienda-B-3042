import { Outlet, useOutletContext } from "react-router-dom";
import Header from "../../../layout/header/header/Header";
import { Box } from "@mui/material";
import { User } from "../../../../types/user";
import { useState } from "react";
import ToggleableUserMenu from "../side-menu/ToggleableUserMenu";

const UserAccountLayout = () => {
  const authUserContext = useOutletContext<User>();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setOpenDrawer((prev) => !prev);
  const handleOpenSideMenu = () => setIsMenuOpen((prev) => !prev);

  console.log(openDrawer);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />

      <Box sx={{ display: "flex" }}>
        <ToggleableUserMenu
          isOpen={isMenuOpen}
          handleDrawerOpen={handleOpenDrawer}
          handleOpen={handleOpenSideMenu}
          isDrawerOpen={openDrawer}
          user={authUserContext}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet context={authUserContext} />
        </Box>
      </Box>
    </>
  );
};

export default UserAccountLayout;
