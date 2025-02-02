import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import HeaderDrawerSearchbar from "./HeaderDrawerSearchbar";
import SearchIcon from "@mui/icons-material/Search";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";

const MobileSearchBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  console.log("open", open);
  return (
    <Grid
      size={{ xs: "grow" }}
      container
      sx={{
        justifyContent: "flex-end",
        display: { xs: "flex", md: "none" },
      }}
    >
      <HeaderDrawerSearchbar open={open} onCloseDrawer={() => {}} />
      {/* <BorderIconButton onClick={handleOpen} size="small" tooltipTitle="Search">
        <SearchIcon />
      </BorderIconButton> */}
    </Grid>
  );
};

export default MobileSearchBar;
