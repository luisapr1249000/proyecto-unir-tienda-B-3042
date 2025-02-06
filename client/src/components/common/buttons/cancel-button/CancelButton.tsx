import ClearIcon from "@mui/icons-material/Clear";
import { Button, Typography } from "@mui/material";

export const ConfirmButton = ({
  fullWidth = false,
  onConfirm,
}: {
  fullWidth?: boolean;
  onConfirm?: () => void;
}) => {
  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth={fullWidth}
      endIcon={<DeleteForeverIcon fontSize="inherit" />}
      onClick={onConfirm}
    >
      <Typography variant="body2">Confirm</Typography>
    </Button>
  );
};

export const NotConfirmButton = ({
  fullWidth = false,
  onCancel,
}: {
  fullWidth?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <Button
      variant="outlined"
      // color="error"
      fullWidth={fullWidth}
      endIcon={<ClearIcon fontSize="inherit" />}
      onClick={onCancel}
    >
      <Typography variant="body2">Cancel</Typography>
    </Button>
  );
};

const CancelButton = ({
  fullWidth = false,
  onCancel,
}: {
  fullWidth?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth={fullWidth}
      endIcon={<ClearIcon fontSize="inherit" />}
      onClick={onCancel}
    >
      <Typography variant="body2">Cancel</Typography>
    </Button>
  );
};

export default CancelButton;
