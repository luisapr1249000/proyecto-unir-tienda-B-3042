import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ButtonInputFile = ({
  onChange,
  multiple = false,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}) => {
  return (
    <Button
      variant="outlined"
      startIcon={<CloudUploadIcon />}
      component="label"
      role={undefined}
      tabIndex={-1}
      // fullWidth
    >
      Upload files
      <input
        onChange={onChange}
        type="file"
        style={{ display: "none" }}
        multiple={multiple}
        accept="image/*"
      />
    </Button>
  );
};

export default ButtonInputFile;
