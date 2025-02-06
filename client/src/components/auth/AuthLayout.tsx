import { useState } from "react";
import { Footer } from "../layout/footer/Footer";
import Header from "../layout/header/header/Header";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import MobileToggleableDrawer from "../common/drawers/MobileToggleableDrawer";
import ToggleableDrawerList from "../common/drawers/lists/ToggleableDrawerList";
import { createMenuItems } from "../../utils/menu.utils";

const AuthLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />

      <MobileToggleableDrawer
        onCloseDrawer={handleCloseDrawer}
        isOpen={isDrawerOpen}
      >
        <ToggleableDrawerList
          isSideMenuOpen={isDrawerOpen}
          listItem={createMenuItems()}
          onCloseDrawer={handleCloseDrawer}
        />
      </MobileToggleableDrawer>

      <Grid sx={{ minHeight: "calc(100vh)" }} direction="column" container>
        <Outlet />
        <Footer />
      </Grid>
    </>
  );
};

export default AuthLayout;
