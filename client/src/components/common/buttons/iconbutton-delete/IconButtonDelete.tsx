import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

const IconButtonDelete = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
      <IconButton size="small" onClick={onDelete}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default IconButtonDelete;
