import {
  AppBar,
  Button,
  Drawer,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Grid from "@mui/material/Grid2";
import HeaderSearchBar from "../search-bar/HeaderSearchBar";
import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../header-auth/HeaderAuth";
import HeaderAuthButtons from "../header-auth/access-buttons/HeaderAuthButtons";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReactLink from "../../../common/react-link/ReactLink";
import { Link, useParams } from "react-router-dom";
import SkeletonCircle from "../../../common/skeleton/SkeletonCircle";
import { useAuthUser } from "../../../../hooks/auth";
import { useEffect, useState } from "react";
import {
  responsiveDisplay,
  responsiveDisplayIconButtons,
} from "../../../../assets/css/mui-css-objects/muiStyles";
import { gridContainerCenter } from "../../../../assets/css/mui-css-objects/gridCenter";

const ResponsiveHeader = ({ isSuccess, isLoading, authUser }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log("this is open: ", open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log(open);

  const DrawerSearchbar = () => {
    const { searchProduct } = useParams();
    const [search, setSearch] = useState(searchProduct);
    console.log(search);
    return (
      <Drawer
        sx={{
          height: "calc(100vh)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          p: 3,
          "& .MuiDrawer-paper": {
            height: "calc(20vh)",
            p: 3,
          },
        }}
        anchor="top"
        onClose={handleDrawerClose}
        open={open}
      >
        <HeaderSearchBar
          setSearch={setSearch}
          search={search ?? ""}
          handleDrawerClose={handleDrawerClose}
        />
      </Drawer>
    );
  };

  return (
    <Toolbar
      component={Grid}
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        display: { xs: "flex", md: "none" },
      }}
      spacing={2}
    >
      <DrawerSearchbar />

      <Grid container>
        <Tooltip title="Search">
          <IconButton
            sx={{ display: open ? "none" : "flex" }}
            onClick={() => handleDrawerOpen()}
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        {isLoading && <SkeletonCircle />}
        {!isLoading && isSuccess && authUser && <HeaderAuth />}
        {!isLoading && (!isSuccess || !authUser) && <HeaderAuthButtons />}
      </Grid>
    </Toolbar>
  );
};
export default ResponsiveHeader;
