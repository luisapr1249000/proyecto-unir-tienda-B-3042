import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderSearchBar from "../header-search-bar/HeaderSearchBar";
import HeaderAuth from "../header-auth/HeaderAuth";
import HeaderAuthButtons from "../header-auth-buttons/HeaderAuthButtons";
import SkeletonCircle from "../../../common/skeleton/SkeletonCircle";
import { useAuthUser } from "../../../../hooks/auth";
import HeaderHomeButton from "../header-home-button/HeaderHomeButton";
import { blue, grey } from "@mui/material/colors";
import HeaderDrawerButton from "../header-drawer-button/HeaderDrawerButton";

const Header = ({ handleOpenDrawer }: { handleOpenDrawer: () => void }) => {
  const { data: authUser, isSuccess, isLoading } = useAuthUser();
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      color="inherit"
    >
      <Toolbar
        component={Grid}
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        spacing={2}
      >
        <HeaderHomeButton handleClickDrawer={handleOpenDrawer} />
        <HeaderSearchBar />

        {isLoading && <SkeletonCircle />}
        {!isLoading && isSuccess && authUser && <HeaderAuth />}
        {!isLoading && (!isSuccess || !authUser) && <HeaderAuthButtons />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
