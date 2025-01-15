import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useParams } from "react-router-dom";
import HeaderDrawerSearchbar from "./HeaderDrawerSearchbar";
import HeaderSearchbarForm from "./HeaderSearchbarForm";

const HeaderSearchBar = ({}: {}) => {
  const navigate = useNavigate();
  const { searchProduct } = useParams();
  const [search, setSearch] = useState(searchProduct ?? "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && search && search.length > 0) {
      navigate(`/products/search/${search}`);
    }
  };
  const handleClick = () => {
    if (search && search.length > 0) {
      navigate(`/products/search/${search}`);
    }
  };

  return (
    <>
      <HeaderDrawerSearchbar />
      <Grid
        sx={{
          justifyContent: "center",
          alignContent: "center",
          display: { xs: "none", md: "flex" },
        }}
        container
        size={{ xs: 8, md: 5 }}
      >
        <HeaderSearchbarForm
          search={search}
          handleChange={handleChange}
          handleClick={handleClick}
          handleEnter={handleEnter}
        />
      </Grid>
    </>
  );
};

export default HeaderSearchBar;
