import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ListItemProps } from "../../../../types/abstract";
import { ListItemLink } from "../../react-link/Link";

const ToggleableDrawerList = ({
  listItem,
  isDrawOpen,
}: {
  listItem: ListItemProps[];
  isDrawOpen: boolean;
}) => (
  <>
    {listItem.map((item) => (
      <ListItemLink
        key={item.label}
        to={item.link}
        divider
        disableGutters
        disablePadding
      >
        <ListItemButton disableRipple>
          <ListItemIcon sx={{ minWidth: 0, mr: isDrawOpen ? 2 : 0 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            sx={{ display: isDrawOpen ? "block" : "none" }}
            primary={item.label}
            // disableTypography
            primaryTypographyProps={{ fontSize: "0.8rem" }}
          />
        </ListItemButton>
      </ListItemLink>
    ))}
  </>
);

export default ToggleableDrawerList;
