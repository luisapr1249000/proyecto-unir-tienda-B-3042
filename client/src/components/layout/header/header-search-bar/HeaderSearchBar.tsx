import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const HeaderSearchBar = ({
  isFullBar = false,
  handleDrawerClose,
  search,
  setSearch,
}: {
  isFullBar?: boolean;
  handleDrawerClose?: () => void;
  search?: string;
  setSearch?: (search: string) => void;
}) => {
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && search && search.length > 0) {
      navigate(`/products/search/${search}`);
      handleDrawerClose?.();
    }
  };
  const handleClick = () => {
    if (search && search.length > 0) {
      handleDrawerClose?.();
      navigate(`/products/search/${search}`);
    }
  };

  console.log(search);
  return (
    <Grid
      sx={{
        justifyContent: "center",
        alignContent: "center",
      }}
      container
      size={{ xs: 8, md: 5 }}
    >
      <TextField
        value={search}
        placeholder="Search anything you like!"
        onChange={handleChange}
        onKeyDown={handleEnter}
        fullWidth
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Search">
                  <IconButton size="small" onClick={handleClick}>
                    <SearchIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            sx: { bgcolor: "#fff" },
          },
        }}
        sx={{
          "& .MuiInputBase-input": {
            // transition: (theme) => theme.transitions.create("width"),
            // // width: 250,
            // "&:focus": { width: 400 },
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#00f",
            },
          },
        }}
      />
    </Grid>
  );
};

export default HeaderSearchBar;
