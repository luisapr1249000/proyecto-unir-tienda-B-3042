import React from "react";
import Header from "../../layout/header/header/Header";
import {
  BaseLayOut,
  ToggleableSideMenu,
} from "../../layout/base-layout/BaseLayout";

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
          handleOpen={handleOpenSideMenu}
          isOpen={isOpenSideMenu}
          isDrawerOpen={isOpenDrawer}
          handleDrawerOpen={handleOpenDrawer}
        />
      </BaseLayOut>
    </>
  );
};

export default ProductDetailLayout;
