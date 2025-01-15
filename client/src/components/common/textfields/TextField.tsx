import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CreateIcon from "@mui/icons-material/Create";

const TextField = ({
  hasError,
  isSelect = false,
  ...props
}: MuiTextFieldProps & { hasError?: boolean; isSelect?: boolean }) => (
  <MuiTextField
    {...props}
    slotProps={{
      inputLabel: { shrink: true },
      input: {
        endAdornment: !isSelect ? (
          <InputAdornment position="end">
            {hasError ? <ErrorIcon color="error" /> : <CreateIcon />}
          </InputAdornment>
        ) : undefined,
      },
    }}
  />
);

export default TextField;
