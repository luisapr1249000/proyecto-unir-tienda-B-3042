import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ToggleableDrawer from "../../../common/drawers/ToggleableSideMenu";
import ToggleableDrawerList from "../../../common/drawers/lists/ToggleableDrawerList";
import MobileToggleableDrawer from "../../../common/drawers/MobileToggleableDrawer";

const ToggleableDrawerMenu = ({
  handleDrawerOpen,
  isDrawerOpen,
  handleOpen,
  isOpen,
}: {
  handleOpen: () => void;
  handleDrawerOpen: () => void;
  isOpen: boolean;
  isDrawerOpen: boolean;
}) => {
  const options = [
    {
      label: "Users",
      link: "/admin/users",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Products",
      link: "/admin/products",
      icon: <HomeIcon />,
    },
    {
      label: "Reviews",
      link: "/admin/reviews",
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <>
      <ToggleableDrawer onClick={handleOpen} isSideMenuOpen={isOpen}>
        <ToggleableDrawerList isSideMenuOpen={isOpen} listItem={options} />
      </ToggleableDrawer>
      <MobileToggleableDrawer
        onCloseDrawer={handleDrawerOpen}
        isOpen={isDrawerOpen}
      >
        <ToggleableDrawerList
          isSideMenuOpen={isDrawerOpen}
          listItem={options}
        />
      </MobileToggleableDrawer>
    </>
  );
};

export default ToggleableDrawerMenu;
