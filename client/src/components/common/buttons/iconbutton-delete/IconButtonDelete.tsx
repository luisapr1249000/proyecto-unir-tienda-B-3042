import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { grey } from "@mui/material/colors";

const IconButtonDelete = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <Box
      sx={{
        bgcolor: grey[50],
        p: 0.3,
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      <IconButton size="small" onClick={onDelete}>
        <ClearIcon sx={{ color: grey[900] }} fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default IconButtonDelete;
