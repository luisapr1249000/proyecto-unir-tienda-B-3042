import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React, { useState } from "react";

const MoreOptionsButton = ({
  productId,
  isAuthor,
}: {
  productId: string;
  isAuthor: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const authorOptions = [
    {
      label: "Edit",
      link: `/products/${productId}/update`,
    },
    {
      label: "Delete",
    },
  ];

  const onDelete = () => {
    handleClose();
    console.log("delete it");
  };
  return (
    <Box>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <OutlinedFlagIcon />
          </ListItemIcon>

          <Typography variant="body2">Report</Typography>
        </MenuItem>
        {isAuthor && (
          <>
            {authorOptions.map((option) => (
              <MenuItem
                onClick={option.label === "Delete" ? onDelete : handleClose}
                key={option.label}
              >
                <Typography variant="body2">{option.label}</Typography>
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </Box>
  );
};

export default MoreOptionsButton;
