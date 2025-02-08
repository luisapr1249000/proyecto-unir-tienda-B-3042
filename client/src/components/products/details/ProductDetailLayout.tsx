import React from "react";
import Header from "../../layout/header/header/Header";
import { BaseLayOut } from "../../layout/base-layout/BaseLayout";
import ToggleableSideMenu from "../../common/drawers/ToggleableSideMenu";
import { List } from "@mui/material";
import ToggleableDrawerList from "../../common/drawers/lists/ToggleableDrawerList";
import MobileToggleableDrawer from "../../common/drawers/MobileToggleableDrawer";
import { createMenuItems } from "../../../utils/menu.utils";

export const ProductListOption = ({
  isSideMenuOpen,
  onCloseDrawer,
}: {
  isSideMenuOpen: boolean;
  onCloseDrawer?: () => void;
}) => {
  return (
    <List>
      <ToggleableDrawerList
        isSideMenuOpen={isSideMenuOpen}
        listItem={createMenuItems()}
        onCloseDrawer={onCloseDrawer}
      />
    </List>
  );
};

const ProductDetailLayout = () => {
  const [isOpenSideMenu, setIsOpenSideMenu] = React.useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const handleOpenSideMenu = () => setIsOpenSideMenu((prev) => !prev);
  const handleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <BaseLayOut>
        <ToggleableSideMenu
          onClick={handleOpenSideMenu}
          isSideMenuOpen={isOpenSideMenu}
        >
          <ProductListOption
            isSideMenuOpen={isOpenSideMenu}
            onCloseDrawer={handleOpenDrawer}
          />
        </ToggleableSideMenu>
        <MobileToggleableDrawer
          onCloseDrawer={handleOpenDrawer}
          isOpen={isOpenDrawer}
        >
          <ProductListOption
            isSideMenuOpen={isOpenSideMenu}
            onCloseDrawer={handleOpenDrawer}
          />
        </MobileToggleableDrawer>
      </BaseLayOut>
    </>
  );
};

export default ProductDetailLayout;
