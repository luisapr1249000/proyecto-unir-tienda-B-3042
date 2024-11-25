import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ isIconButton = false }: { isIconButton?: boolean }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return isIconButton ? (
    <IconButton onClick={handleClick}>
      <HomeIcon />
    </IconButton>
  ) : (
    <Button endIcon={<HomeIcon />} variant="outlined" onClick={handleClick}>
      <Typography>Home</Typography>
    </Button>
  );
};

export default HomeButton;
