import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { it } from "node:test";

const BasicDialogReport = ({
  open,
  handleClose,
  children,
  itemType,
}: {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  itemType: string;
}) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Report {itemType}</DialogTitle>
      <Tooltip title="Close">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default BasicDialogReport;
