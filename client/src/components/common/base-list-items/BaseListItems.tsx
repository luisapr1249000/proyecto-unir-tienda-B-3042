import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import ReactLink from "../react-link/ReactLink";

const BaseListItems = ({
  icon,
  link,
  label,
  divider,
  open,
}: {
  label: string;
  link: string;
  icon?: ReactNode;
  divider?: boolean;
  open?: boolean;
}) => {
  return (
    <ListItem
      divider={divider}
      component={ReactLink}
      to={`/${link}`}
      sx={{ p: 1, display: "flex" }}
    >
      <ListItemButton>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default BaseListItems;
