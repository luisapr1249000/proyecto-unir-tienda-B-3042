import { AppBar, Divider, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderSearchBar from "../search-bar/HeaderSearchBar";
import SkeletonCircle from "../../../common/skeleton/SkeletonCircle";
import { useAuthUser } from "../../../../hooks/auth";
import HeaderHomeButton from "../home-button/HeaderHomeButton";
import HeaderThemeSwitcherButton from "../header-theme-switcher/HeaderThemeSwitcherButton";
import HeaderUserMenu from "../auth/user-menu/HeaderUserMenu";
import HeaderAccessButtons from "../auth/access-buttons/HeaderAccessButtons";

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
          justifyContent: "space-evenly",
          alignItems: "center",
          // border: 1,
        }}
        spacing={2}
      >
        <HeaderHomeButton handleClickDrawer={handleOpenDrawer} />
        <HeaderSearchBar />

        <Grid
          container
          // size={{ xs: "grow" }}
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          {isLoading ? (
            <SkeletonCircle />
          ) : isSuccess && authUser ? (
            <HeaderUserMenu />
          ) : (
            <HeaderAccessButtons />
          )}
          <Divider orientation="vertical" flexItem />
          <HeaderThemeSwitcherButton />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
