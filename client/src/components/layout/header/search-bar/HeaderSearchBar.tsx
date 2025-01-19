import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import HeaderDrawerSearchbar from "./mobile/HeaderDrawerSearchbar";
import HeaderSearchbarForm from "./HeaderSearchbarForm";
import MobileSearchBar from "./mobile/MobileSearchBar";

const HeaderSearchBar = ({}: {}) => {
  const navigate = useNavigate();
  const { searchProduct } = useParams();
  const [search, setSearch] = useState(searchProduct ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && search && search.length > 0) {
      navigate(`/products/search?query=${search}`);
    }
  };
  const handleClick = () => {
    if (search && search.length > 0) {
      navigate(`/products/search?query=${search}`);
    }
  };

  return (
    <>
      <MobileSearchBar />
      <Grid
        sx={{
          justifyContent: "center",
          alignContent: "center",
          // border: 1,
          display: { xs: "none", md: "flex" },
        }}
        container
        size={{ xs: 0, md: 5 }}
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
