import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { capitalizedText } from "../../../assets/css/mui-css-objects/gridCenter";
import CancelButton from "../buttons/cancel-button/CancelButton";
import ConfirmButton from "../buttons/confirm-button/ConfirmButton";
import { grey, red } from "@mui/material/colors";

const DialogConfirmAction = ({
  open,
  object,
  onDeleteObject,
  onCancel,
}: {
  open: boolean;
  onDeleteObject: () => void;
  object: "Product" | "Comment" | "Category" | "User";
  onCancel: () => void;
}) => {
  return (
    open && (
      <Dialog fullWidth onClose={onCancel} open={open}>
        <DialogTitle sx={{ p: 3 }}>Confirm Action</DialogTitle>
        <IconButton
          onClick={onCancel}
          sx={{ color: grey[500], position: "absolute", right: 8, top: 8 }}
        >
          <ClearIcon />
        </IconButton>

        <DialogContent dividers>
          <Alert severity="error">
            <Typography
              color="textSecondary"
              gutterBottom
              sx={[capitalizedText]}
            >
              Are you sure? This action cant be undone
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <ConfirmButton onConfirm={onDeleteObject} />
          <CancelButton onCancel={onCancel} />
        </DialogActions>
      </Dialog>
    )
  );
};

export default DialogConfirmAction;
