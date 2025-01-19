import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type BasicDialogProps = {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
};

const BasicDialog = ({
  open,
  handleClose,
  dialogTitle,
  children,
}: BasicDialogProps & { children: React.ReactNode }) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>{dialogTitle}</DialogTitle>
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

export default BasicDialog;
