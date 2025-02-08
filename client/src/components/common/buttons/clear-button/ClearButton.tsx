import { Button, ButtonProps } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export type ClearButtonProps = ButtonProps & { message?: string };

const ClearButton = ({ message, ...props }: ClearButtonProps) => {
  return (
    <Button color="error" {...props} endIcon={<ClearIcon />}>
      {message ?? "Clear"}
    </Button>
  );
};

export default ClearButton;
