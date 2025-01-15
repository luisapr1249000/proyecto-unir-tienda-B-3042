import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  ListItemProps,
  ListItem,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import {
  NavLink,
  Link as ReactLink_,
  NavLinkProps,
  LinkProps,
} from "react-router-dom";

export const Link = (props: LinkProps & MuiLinkProps) => (
  <MuiLink {...props} component={ReactLink_} />
);

export const ListItemLink = (props: ListItemProps & NavLinkProps) => (
  <ListItem
    sx={{
      color: "text.primary",
      "&.active": { color: blue[50], bgcolor: blue[500] },
    }}
    component={NavLink}
    {...props}
  />
);
