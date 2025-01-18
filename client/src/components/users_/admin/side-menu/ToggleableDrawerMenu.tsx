import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ToggleableDrawer from "../../../common/drawers/ToggleableDrawer";
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
      <ToggleableDrawer handleOpen={handleOpen} isOpen={isOpen}>
        <ToggleableDrawerList isDrawOpen={isOpen} listItem={options} />
      </ToggleableDrawer>
      <MobileToggleableDrawer
        handleOpen={handleDrawerOpen}
        isOpen={isDrawerOpen}
      >
        <ToggleableDrawerList isDrawOpen={isDrawerOpen} listItem={options} />
      </MobileToggleableDrawer>
    </>
  );
};

export default ToggleableDrawerMenu;
