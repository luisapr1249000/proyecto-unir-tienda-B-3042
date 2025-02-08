import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderIconButton from "../../buttons/border-icon-button/BorderIconButton";
import ConfirmButton from "../../buttons/confirm-button/ConfirmButton";
import ClearButton from "../../buttons/clear-button/ClearButton";

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
  onConfirm?: () => void;
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  message = "Are you sure? This action cant be undone",
}: ConfirmDialogProps) => {
  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>Confirm Action</DialogTitle>
      <BorderIconButton
        onClick={onClose}
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
      <DialogContent dividers>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ConfirmButton variant="contained" color="error" onClick={onConfirm} />
        <ClearButton
          size="small"
          message="Cancel"
          variant="contained"
          color="primary"
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
