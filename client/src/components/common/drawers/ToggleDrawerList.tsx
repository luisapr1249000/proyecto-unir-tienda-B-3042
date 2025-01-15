import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { ListItemProps } from "../../../types/abstract";

const ToggleDrawerList = ({ listItem }: { listItem: ListItemProps[] }) => {
  return (
    <List>
      {listItem.map((item) => (
        <ListItem key={item.label}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ToggleDrawerList;
