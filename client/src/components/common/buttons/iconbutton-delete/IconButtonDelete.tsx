import { Box, IconButton, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";

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
