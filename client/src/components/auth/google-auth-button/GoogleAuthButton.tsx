import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../react-icons/GoogleIcon";

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const handleClick = () =>
    (window.location.href = "http://localhost:8000/api/v1/auth/google");
  return (
    <Button
      fullWidth
      startIcon={<GoogleIcon />}
      onClick={handleClick}
      color="inherit"
      variant="contained"
      sx={{ boxShadow: 1, borderRadius: 1.5 }}
    >
      Google
    </Button>
  );
};

export default GoogleAuthButton;
