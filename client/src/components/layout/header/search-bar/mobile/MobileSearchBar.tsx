import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import SearchBarIconButton from "./SearchBarIconButton";
import HeaderDrawerSearchbar from "./HeaderDrawerSearchbar";

const MobileSearchBar = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerClick = () => setOpen((prev) => !prev);
  return (
    <Grid
      container
      sx={{
        justifyContent: "flex-end",
        border: 1,
        display: { xs: "flex", md: "none" },
      }}
    >
      <HeaderDrawerSearchbar
        open={open}
        handleDrawerClick={handleDrawerClick}
      />
      <SearchBarIconButton handleDrawerClick={handleDrawerClick} />
    </Grid>
  );
};

export default MobileSearchBar;
