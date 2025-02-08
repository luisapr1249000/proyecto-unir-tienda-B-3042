import { IconButton, InputAdornment, TextField } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-toastify";

const ShareTextField = ({ url }: { url: string }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiada");
  };
  return (
    <TextField
      label="Compartir"
      variant="outlined"
      fullWidth
      value={url}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <ShareIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ShareTextField;
