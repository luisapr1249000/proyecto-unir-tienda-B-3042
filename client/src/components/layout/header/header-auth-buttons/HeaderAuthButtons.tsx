import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid2";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveIconButton from "../../../common/buttons/responsive-buttons/ResponsiveButton";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";
import { gridContainerCenter } from "../../../../assets/css/mui-css-objects/gridCenter";

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
    <Grid
      sx={{ border: 1, ...gridContainerCenter, p: undefined }}
      container
      spacing={2}
    >
      {settings.map((setting) => (
        <Box key={setting.link}>
          <Tooltip title={setting.label}>
            <IconButton
              color={setting.label === "Signup" ? "success" : "inherit"}
              component={Link}
              to={setting.link}
              sx={{ ...responsiveDisplayIconButtons }}
              size="small"
            >
              {setting.icon}
            </IconButton>
          </Tooltip>
          <Button
            color={setting.label === "Signup" ? "success" : "inherit"}
            endIcon={setting.icon}
            variant={setting.label === "Signup" ? "contained" : "outlined"}
            component={Link}
            to={setting.link}
            sx={{ ...responsiveDisplay }}
          >
            {setting.label}
          </Button>
        </Box>
      ))}
    </Grid>
  );
};
export default HeaderAuthButtons;
