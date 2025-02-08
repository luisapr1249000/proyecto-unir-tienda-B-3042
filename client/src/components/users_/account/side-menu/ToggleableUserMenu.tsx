import ToggleableDrawer from "../../../common/drawers/ToggleableSideMenu";
import { GridNavLink } from "../../../common/react-link/Link";
import { User } from "../../../../types/user";
import ToggleableDrawerList from "../../../common/drawers/lists/ToggleableDrawerList";
import MobileToggleableDrawer from "../../../common/drawers/MobileToggleableDrawer";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
      label: "Update your information",
      link: `/users/${user.username}/update`,
      description: "something i used to have. ",
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/update`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <EditIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "User Information",
      link: `/users/${user.username}/overview`,
      description: "something i used to have. ",
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/overview`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <InfoIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "Account Security",
      link: `/users/${user.username}/change-password`,
      description: "something i used to have. ",
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/change-password`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <SecurityIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "Delete Account",
      link: `/users/${user.username}/delete-account`,
      description: "something i used to have. ",
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/delete-account`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <PersonRemoveIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "Address Directions",
      link: `/users/${user.username}/address-directions`,
      description: "something i used to have. ",
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/address-directions`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <LibraryBooksIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "Cart",
      link: `/users/${user?.username}/cart`,
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/cart`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <ShoppingCartIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
    {
      label: "Wishlist",
      link: `/users/${user?.username}/wishlist`,
      icon: (
        <GridNavLink
          container
          to={`/users/${user.username}/wishlist`}
          sx={{
            "&.active": { color: "primary.dark" },
            color: "text.secondary",
          }}
        >
          <FavoriteIcon fontSize="inherit" />
        </GridNavLink>
      ),
    },
  ];
  return (
    <>
      <ToggleableDrawer
        onClick={props.handleOpen}
        isSideMenuOpen={props.isOpen}
        drawerWidth={300}
      >
        <ToggleableDrawerList
          isSideMenuOpen={props.isOpen}
          listItem={options}
        />
      </ToggleableDrawer>
      <MobileToggleableDrawer
        onCloseDrawer={props.handleDrawerOpen}
        isOpen={props.isDrawerOpen}
      >
        <ToggleableDrawerList
          isSideMenuOpen={props.isOpen}
          listItem={options}
        />
      </MobileToggleableDrawer>
    </>
  );
};

export default ToggleableUserMenu;
