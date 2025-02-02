import React, { useState } from "react";
import { BaseLayOut } from "../../../layout/base-layout/BaseLayout";
import MobileToggleableDrawer from "../../../common/drawers/MobileToggleableDrawer";
import ToggleableDrawerList from "../../../common/drawers/lists/ToggleableDrawerList";
import { createMenuItems } from "../../../../utils/menu.utils";
import Header from "../../../layout/header/header/Header";

const UserCartLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);
  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <BaseLayOut>
        <MobileToggleableDrawer
          onCloseDrawer={handleOpenDrawer}
          isOpen={isOpenDrawer}
        >
          <ToggleableDrawerList
            isSideMenuOpen={isOpenDrawer}
            listItem={createMenuItems()}
            onCloseDrawer={handleOpenDrawer}
          />
        </MobileToggleableDrawer>
      </BaseLayOut>
    </>
  );
};

export default UserCartLayout;
