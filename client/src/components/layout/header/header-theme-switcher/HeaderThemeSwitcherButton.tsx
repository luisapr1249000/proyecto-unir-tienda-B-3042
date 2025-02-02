import { Button, Card, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import React from "react";
import HeaderThemeSwitcherDrawer from "./HeaderThemeSwitcherDrawer";
import { BorderIconButton } from "../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { Link } from "react-router-dom";
const HeaderThemeSwitcherButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((prev) => !prev);
  return (
    <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
      <HeaderThemeSwitcherDrawer open={open} handleOpen={handleOpen} />
      <BorderIconButton
        size="small"
        onClick={handleOpen}
        tooltipTitle="Settings"
      >
        <SettingsIcon color="primary" />
      </BorderIconButton>

      {/* <Avatar
        sx={{ height: 30, width: 30 }}
        component={IconButton}
        onClick={handleOpen}
      >
        <SettingsIcon />
      </Avatar> */}
      {/* <Card variant="outlined">
        <IconButton
          sx={{ height: 1, borderRadius: 1 }}
          size="small"
          onClick={handleOpen}
        >
          <SettingsIcon />
        </IconButton>
      </Card> */}
    </Grid>
  );
};

export default HeaderThemeSwitcherButton;
