import { Button, Typography, ButtonProps } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const ConfirmButton = (props: ButtonProps) => {
  return (
    <Button {...props} endIcon={<DeleteForeverIcon fontSize="inherit" />}>
      <Typography variant="body2">Confirm</Typography>
    </Button>
  );
};

export default ConfirmButton;
