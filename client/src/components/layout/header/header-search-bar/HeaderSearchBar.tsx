import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const HeaderSearchBar = ({ isFullBar = false }: { isFullBar?: boolean }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(search); // Use value instead of target
    }
  };

  return (
    <Grid
      sx={{
        border: 1,
        justifyContent: "center",
        alignContent: "center",
        display: {
          xs: isFullBar ? "flex" : "none",
          md: isFullBar ? "none" : "flex",
        },
      }}
      container
      size={{
        xs: isFullBar ? 12 : undefined,
        md: isFullBar ? "auto" : "grow",
      }}
    >
      <TextField
        placeholder="Search anything you like!"
        onChange={handleChange}
        onKeyDown={handleEnter}
        fullWidth
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
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
