import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const HeaderSearchBar = () => {
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
    <Grid container size={{ xs: 3 }}>
      <TextField
        onChange={handleChange}
        onKeyDown={handleEnter}
        fullWidth
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {" "}
                {/* Changed to "end" */}
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
