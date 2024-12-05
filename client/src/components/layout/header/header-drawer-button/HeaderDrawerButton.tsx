import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ModeSwitcher from "../../../common/mode-switcher/ModeSwitcher";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const HeaderDrawerButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const drawer = (
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

  return (
    <>
      {drawer}
      <Card variant="outlined">
        <IconButton
          sx={{ height: 1, borderRadius: 1 }}
          size="small"
          onClick={handleOpen}
        >
          <SettingsIcon />
        </IconButton>
      </Card>
    </>
  );
};

export default HeaderDrawerButton;
