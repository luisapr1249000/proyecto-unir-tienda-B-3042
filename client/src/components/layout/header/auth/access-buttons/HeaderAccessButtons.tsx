import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid2";
import { Box, Button, Card, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { responsiveDisplay } from "../../../../../assets/css/mui-css-objects/muiStyles";
import { gridContainerCenter } from "../../../../../assets/css/mui-css-objects/gridCenter";
import { blue, grey } from "@mui/material/colors";

const HeaderAccessButtons = () => {
  const settings = [
    {
      label: "Login",
      link: "/auth/login",
      icon: <LogoutIcon />,
    },
    {
      label: "Signup",
      link: "auth/signup",
      icon: (
        <PersonAddIcon sx={{ color: { xs: "primary.main", md: grey[50] } }} />
      ),
    },
  ];

  return (
    <Grid
      size={{ xs: 6 }}
      sx={{ justifyContent: "space-evenly", alignItems: "center" }}
      container
      // spacing={2}
    >
      {settings.map((setting) => (
        <Box key={setting.link}>
          <Button
            size="small"
            endIcon={setting.icon}
            variant={setting.label === "Signup" ? "contained" : "outlined"}
            component={Link}
            to={setting.link}
            sx={{ ...responsiveDisplay }}
          >
            {setting.label}
          </Button>
          <Box
            sx={{ display: { xs: "flex", md: "none" } }}
            component={Card}
            variant="outlined"
          >
            <Tooltip title={setting.label}>
              <IconButton
                component={Link}
                to={setting.link}
                sx={{
                  display: { xs: "flex", md: "none" },
                  height: 1,
                  borderRadius: 1,
                }}
                size="small"
              >
                {setting.icon}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
export default HeaderAccessButtons;
