import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemProps } from "../../../../types/abstract";
import { GridNavLink, NavLinkListItemButton } from "../../react-link/Link";

const ToggleableDrawerList = ({
  listItem,
  isSideMenuOpen,
  onCloseDrawer,
}: {
  listItem: ListItemProps[];
  isSideMenuOpen: boolean;
  onCloseDrawer?: () => void;
}) => {
  return (
    <>
      {listItem.map((item) => (
        <ListItem
          key={item.label}
          dense={isSideMenuOpen}
          disableGutters={!isSideMenuOpen}
          sx={{}}
        >
          <NavLinkListItemButton
            onClick={onCloseDrawer}
            to={item.link}
            sx={{
              color: "text.secondary",
              borderRadius: isSideMenuOpen ? 2 : 0,
              "&.active": { color: "text.primary", bgcolor: "action.hover" },
            }}
          >
            {item.icon && (
              <ListItemIcon
                onClick={onCloseDrawer}
                sx={{
                  minWidth: 0,
                  mr: isSideMenuOpen ? 3 : 0,
                  borderRadius: 1.5,
                  border: isSideMenuOpen ? 2 : 0,
                  p: isSideMenuOpen ? 1 : 0.4,
                  borderColor: "divider",
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ display: isSideMenuOpen ? "block" : "none" }}
              primary={item.label}
              primaryTypographyProps={{ fontSize: ".95rem" }}
            />
          </NavLinkListItemButton>
        </ListItem>
      ))}
    </>
  );
};
export default ToggleableDrawerList;
