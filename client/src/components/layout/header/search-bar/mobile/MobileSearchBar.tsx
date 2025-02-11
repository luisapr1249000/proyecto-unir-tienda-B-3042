import Grid from "@mui/material/Grid2";
import HeaderDrawerSearchbar from "./HeaderDrawerSearchbar";

const MobileSearchBar = () => {
  return (
    <Grid
      size={{ xs: "grow" }}
      container
      sx={{
        justifyContent: "flex-end",
        display: { xs: "flex", md: "none" },
      }}
    >
      <HeaderDrawerSearchbar onCloseDrawer={() => {}} />
    </Grid>
  );
};

export default MobileSearchBar;
