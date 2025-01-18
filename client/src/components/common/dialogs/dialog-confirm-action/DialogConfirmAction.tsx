import {
  AlertProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { capitalizedText } from "../../../../assets/css/mui-css-objects/gridCenter";
import {
  ConfirmButton,
  NotConfirmButton,
} from "../../buttons/cancel-button/CancelButton";
import { Alert } from "@mui/material";

const DialogConfirmAction = ({
  open,
  onClose,
  onDeleteObject,
  message = "Are you sure? This action cant be undone",
  severity = "error",
}: {
  open: boolean;
  onClose: () => void;
  onDeleteObject: () => void;
  message?: string;
  severity?: AlertProps["severity"];
}) => (
  <Dialog fullWidth onClose={onClose} open={open}>
    <DialogTitle>Confirm Action</DialogTitle>
    <Divider />

    {message && (
      <DialogContent>
        <Alert severity={severity}>
          <Typography color="textSecondary" gutterBottom sx={[capitalizedText]}>
            {message}
          </Typography>
        </Alert>
      </DialogContent>
    )}
    <DialogActions sx={{ py: 2 }}>
      <ConfirmButton onConfirm={onDeleteObject} />

      <NotConfirmButton onCancel={onClose} />
    </DialogActions>
  </Dialog>
);

export default DialogConfirmAction;
