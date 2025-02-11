import SettingsIcon from "@mui/icons-material/Settings";
import Grid from "@mui/material/Grid2";
import React from "react";
import HeaderThemeSwitcherDrawer from "./HeaderThemeSwitcherDrawer";
import { BorderIconButton } from "../../../common/buttons/iconbutton-delete/IconButtonDelete";
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
    </Grid>
  );
};

export default HeaderThemeSwitcherButton;
