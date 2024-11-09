import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import React from "react";

const ShowPassword = ({
  showPassword,
  handleClickShowPassword,
}: {
  showPassword: boolean;
  handleClickShowPassword: () => void;
}) => {
  return (
    <IconButton onClick={handleClickShowPassword}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
};

export default ShowPassword;
