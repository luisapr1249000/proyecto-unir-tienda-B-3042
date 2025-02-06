import InfoDialog from "../../common/dialogs/info-dialog/InfoDialog";
import { TextField, IconButton, Tooltip, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import ShareIcon from "@mui/icons-material/Share";

const ShareProductDialog = ({
  productUrl,
  open,
  onClose,
}: {
  productUrl: string;
  open: boolean;
  onClose: () => void;
}) => {
  const handleClick = () => {
    navigator.clipboard.writeText(productUrl);
    toast.success("Url copied to clipboard!");
  };

  return (
    <InfoDialog dialogTitle="Share Product" onClose={onClose} open={open}>
      <TextField
        fullWidth
        label="Share Product"
        variant="outlined"
        value={productUrl}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={handleClick}>
                    <ShareIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
      />
    </InfoDialog>
  );
};

export default ShareProductDialog;
