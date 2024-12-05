import { Drawer } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSearchbarForm from "./HeaderSearchbarForm";

const HeaderDrawerSearchbar = ({}: {}) => {
  const navigate = useNavigate();
  const { searchProduct } = useParams();
  const [search, setSearch] = useState(searchProduct ?? "");
  const [open, setOpen] = useState(false);

  const handleDrawerClick = () => setOpen((prev) => !prev);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && search && search.length > 0) {
      navigate(`/products/search/${search}`);
      handleDrawerClick();
    }
  };
  const handleClick = () => {
    if (search && search.length > 0) {
      handleDrawerClick();
      navigate(`/products/search/${search}`);
    }
  };
  return (
    <>
      <Drawer
        variant="temporary"
        sx={{
          height: "calc(100vh)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          p: 3,
          "& .MuiDrawer-paper": {
            height: "calc(20vh)",
            p: 3,
          },
        }}
        open={open}
        onClose={handleDrawerClick}
        anchor="top"
      >
        <HeaderSearchbarForm
          search={search}
          handleChange={handleChange}
          handleClick={handleClick}
          handleEnter={handleEnter}
        />
      </Drawer>
      <Grid
        container
        sx={{
          justifyContent: "flex-end",
          flexGrow: 1,
          border: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
        <Tooltip title="Search">
          <IconButton
            sx={{ display: open ? "none" : "flex" }}
            onClick={handleDrawerClick}
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};

export default HeaderDrawerSearchbar;
