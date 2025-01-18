import { Drawer } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSearchbarForm from "../HeaderSearchbarForm";
import SearchBarIconButton from "./SearchBarIconButton";

const HeaderDrawerSearchbar = ({
  open,
  handleDrawerClick,
}: {
  open: boolean;
  handleDrawerClick: () => void;
}) => {
  const navigate = useNavigate();
  const { searchProduct } = useParams();
  const [search, setSearch] = useState(searchProduct ?? "");

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
  );
};

export default HeaderDrawerSearchbar;
