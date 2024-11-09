import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderAuthButtons = () => {
  const settings = [
    {
      label: "Login",
      link: "/auth/login",
      icon: <LogoutIcon />,
    },
    {
      label: "Signup",
      link: "auth/signup",
      icon: <PersonAddIcon />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {settings.map((setting) => (
        <Button
          color={setting.label === "Signup" ? "success" : "inherit"}
          endIcon={setting.icon}
          variant={setting.label === "Signup" ? "contained" : "outlined"}
          key={setting.label}
          component={Link}
          to={setting.link}
        >
          {setting.label}
        </Button>
      ))}
    </Grid>
  );
};
export default HeaderAuthButtons;
