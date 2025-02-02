import React from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const HeaderSearchbarForm = ({
  search,
  handleChange,
  handleEnter,
  handleClick,
}: {
  search: string;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleEnter: React.KeyboardEventHandler<HTMLDivElement>;
  handleClick: () => void;
}) => (
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
        // sx: { bgcolor: "#fff" },
      },
    }}
    sx={{
      "& .MuiInputBase-input": {},
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        borderColor: "primary.main",

        "&:hover fieldset": {
          borderColor: "primary.dark",
        },
      },
    }}
  />
);

export default HeaderSearchbarForm;
