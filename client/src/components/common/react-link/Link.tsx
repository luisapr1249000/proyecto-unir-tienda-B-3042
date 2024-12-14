import {
  Link as MuiLink,
  LinkProps,
  ListItemProps,
  ListItem,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { forwardRef } from "react";
import { NavLink, Link as ReactLink_, NavLinkProps } from "react-router-dom";

export const Link = (props: LinkProps) => (
  <MuiLink {...props} component={ReactLink_} to={props.href ?? "#"} />
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
