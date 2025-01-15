import React from "react";

import IconButton from "@mui/material/IconButton";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

const ReportButton = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <IconButton onClick={handleOpen} color="error" size="small">
      <OutlinedFlagIcon fontSize="inherit" />
    </IconButton>
  );
};

export default ReportButton;
