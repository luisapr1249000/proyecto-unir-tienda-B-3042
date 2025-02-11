import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export type BasicReportDialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  itemType: string;
};

const BasicReportDialog = ({
  open,
  onClose,
  children,
  itemType,
}: BasicReportDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Report {itemType}</DialogTitle>
      <Tooltip title="Close">
        <IconButton
          aria-label="close"
          onClick={onClose}
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

export default BasicReportDialog;
