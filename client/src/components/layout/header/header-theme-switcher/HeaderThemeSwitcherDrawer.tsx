import React from "react";
import {
  Drawer,
  Toolbar,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModeSwitcher from "../../../common/mode-switcher/ModeSwitcher";

const HeaderThemeSwitcherDrawer = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => (
  <Drawer
    // PaperProps={{ sx: { p: 0 } }}
    anchor="right"
    onClose={handleOpen}
    open={open}
    variant="temporary"
  >
    <Toolbar />
    <CardContent
      sx={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">Settings</Typography>
      <IconButton
        sx={{ boxShadow: 1, borderRadius: 1 }}
        onClick={handleOpen}
        size="small"
      >
        <CloseIcon color="inherit" fontSize="inherit" />
      </IconButton>
    </CardContent>
    <Divider />
    <CardContent>
      <Typography
        color="textSecondary"
        gutterBottom
        sx={{ display: "flex" }}
        variant="caption"
      >
        Mode
      </Typography>
      <ModeSwitcher />
    </CardContent>
  </Drawer>
);

export default HeaderThemeSwitcherDrawer;
