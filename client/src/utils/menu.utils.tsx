import { GridNavLink } from "../components/common/react-link/Link";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { MenuItem } from "../types/abstract";

const style = {
  color: "text.secondary",
  "&.active": { color: "primary.dark" },
};
const defaultMenuItems = [
  {
    label: "Home",
    link: "/",
    icon: (
      <GridNavLink container to="/" sx={style}>
        <HomeIcon fontSize="inherit" />
      </GridNavLink>
    ),
  },
  {
    label: "Products",
    link: "/products",
    icon: (
      <GridNavLink container to="/products" sx={style}>
        <ShoppingCartIcon fontSize="inherit" />
      </GridNavLink>
    ),
  },

  {
    label: "Sellers",
    link: "/sellers",
    icon: (
      <GridNavLink container to="/sellers" sx={style}>
        <StorefrontRoundedIcon fontSize="inherit" />
      </GridNavLink>
    ),
  },
  {
    label: "Categories",
    link: "/categories",
    icon: (
      <GridNavLink container to="/categories" sx={style}>
        <LocalMallIcon fontSize="inherit" />
      </GridNavLink>
    ),
  },
];

export const createMenuItems = (customItems: MenuItem[] = []) => [
  ...defaultMenuItems,
  ...customItems,
];
