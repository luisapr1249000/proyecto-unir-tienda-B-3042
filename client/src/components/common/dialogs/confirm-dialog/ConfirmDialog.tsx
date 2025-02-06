import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderIconButton from "../../buttons/border-icon-button/BorderIconButton";
import ConfirmButton from "../../buttons/confirm-button/ConfirmButton";

export type ConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  message?: string;
  onConfirm?: () => void;
};

const ConfirmDialog = ({
  open,
  handleClose,
  onConfirm,
  message = "Are you sure? This action cant be undone",
}: ConfirmDialogProps) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Confirm Action</DialogTitle>
      <BorderIconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
        tooltipTitle="Close"
      >
        <CloseIcon />
      </BorderIconButton>
      <Divider />
      <DialogContent dividers>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ConfirmButton color="error" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
