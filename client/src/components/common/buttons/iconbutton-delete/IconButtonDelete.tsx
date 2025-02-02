import {
  Box,
  Button,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";

type BorderIconButtonProps = IconButtonProps & {
  tooltipTitle: string;
};

export const BorderIconButton = ({
  tooltipTitle,
  children,
  ...props
}: BorderIconButtonProps) => {
  // const sx = {
  //   border: 1,
  //   borderColor: "divider",
  //   borderRadius: 3.2,
  //   boxShadow: 2,
  // };
  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3.2,
            boxShadow: 2,
          }}
          {...props}
        >
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
};

const IconButtonDelete = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <Paper
      sx={{
        p: 0.3,
        position: "absolute",
        top: 0,
        right: 0,
      }}
      square
      elevation={1}
    >
      <Tooltip title="Delete">
        <IconButton size="small" onClick={onDelete}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default IconButtonDelete;
