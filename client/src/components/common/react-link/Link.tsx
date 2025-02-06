import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  ListItemProps,
  ListItem,
  TypographyProps,
  Typography,
  ListItemButtonProps,
  ListItemButton,
  ListItemIconProps,
  ListItemIcon,
  Grid2Props,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  NavLink,
  Link as ReactLink_,
  NavLinkProps,
  LinkProps,
} from "react-router-dom";

export const Link = (props: LinkProps & MuiLinkProps) => (
  <MuiLink {...props} component={ReactLink_} />
);

export const NavLinkListItemButton = (
  props: ListItemButtonProps & NavLinkProps
) => <ListItemButton component={NavLink} {...props} />;

export const GridNavLink = (props: Grid2Props & NavLinkProps) => (
  <Grid component={NavLink} {...props} />
);

export const LinkText = (props: LinkProps & MuiLinkProps) => (
  <MuiLink {...props} component={ReactLink_} color="inherit" underline="none" />
);
