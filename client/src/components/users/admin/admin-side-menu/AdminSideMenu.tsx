import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import LisItemHomeButton from "../../../common/buttons/home-button/LisItemHomeButton";
import { NavLink } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import { text } from "stream/consumers";

const AdminSideMenu = () => {
  const drawerWidth = 250;

  const adminSideMenuOptions = [
    { label: "Users", link: "/admin/users", icon: <HomeIcon /> },
    { label: "Products", link: "/admin/products", icon: <HomeIcon /> },
    { label: "Reviews", link: "/admin/reviews", icon: <HomeIcon /> },
    { label: "Reports", link: "/admin/reports", icon: <HomeIcon /> },
  ];

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // height: 1,
        },
      }}
    >
      <Toolbar />
      <List>
        <LisItemHomeButton />
      </List>
      <Paper sx={{ mx: 3, height: "calc(100vh - 200px)" }}>
        <List disablePadding component="nav">
          {adminSideMenuOptions.map((option) => (
            <ListItem
              disablePadding
              component={NavLink}
              to={option.link}
              key={option.label}
              divider
              sx={{
                color: "text.primary",
                "&.active": { color: blue[50], bgcolor: blue[500] },
              }}
            >
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="div" variant="body2">
                      {option.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Drawer>
  );
};

export default AdminSideMenu;
