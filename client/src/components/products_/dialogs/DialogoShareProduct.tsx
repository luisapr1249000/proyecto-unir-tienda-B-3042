import BasicDialog, {
  BasicDialogProps,
} from "../../common/dialogs/basic-dialog/BasicDialog";
import { InputAdornment, TextField, IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-toastify";

const DialogoShareProduct = ({
  productUrl,
  ...props
}: { productUrl: string } & BasicDialogProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(productUrl);
    toast.success("Url copied to clipboard!");
  };
  return (
    <BasicDialog {...props}>
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
    </BasicDialog>
  );
};

export default DialogoShareProduct;
