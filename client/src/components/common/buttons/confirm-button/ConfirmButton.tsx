import { Button, Typography, ButtonProps } from "@mui/material";

export const ConfirmButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      <Typography variant="body2">Confirm</Typography>
    </Button>
  );
};

export default ConfirmButton;
