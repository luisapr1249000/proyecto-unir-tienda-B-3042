import React from "react";
import ToggleableDrawer from "../../../common/drawers/ToggleableDrawer";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { ListItemLink } from "../../../common/react-link/Link";
import { User } from "../../../../types/user";
import { List } from "@mui/material";
import ToggleableDrawerList from "../../../common/drawers/lists/ToggleableDrawerList";
import MobileToggleableDrawer from "../../../common/drawers/MobileToggleableDrawer";

const ToggleableUserMenu = ({
  user,
  ...props
}: {
  user: User;
  handleOpen: () => void;
  handleDrawerOpen: () => void;
  isOpen: boolean;
  isDrawerOpen: boolean;
}) => {
  const options = [
    {
      label: "Actualiza tu informacion",
      link: `/users/${user.username}/update`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Informacion de Usuario",
      link: `/users/${user.username}/overview`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Account Security",
      link: `/users/${user.username}/change-password`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Delete Account",
      link: `/users/${user.username}/delete-account`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Direcciones de Entrega",
      link: `/users/${user.username}/address-directions`,
      description: "something i used to have. ",
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "Cart",
      link: `/users/${user?.username}/cart`,
      icon: <ShoppingCartIcon fontSize="small" />,
    },
    {
      label: "Wishlist",
      link: `/users/${user?.username}/wishlist`,
      icon: <LocalMallIcon fontSize="small" />,
    },
  ];
  return (
    <>
      <ToggleableDrawer {...props}>
        <ToggleableDrawerList isDrawOpen={props.isOpen} listItem={options} />
      </ToggleableDrawer>
      <MobileToggleableDrawer
        handleOpen={props.handleDrawerOpen}
        isOpen={props.isDrawerOpen}
      >
        <ToggleableDrawerList isDrawOpen={props.isOpen} listItem={options} />
      </MobileToggleableDrawer>
    </>
  );
};

export default ToggleableUserMenu;
