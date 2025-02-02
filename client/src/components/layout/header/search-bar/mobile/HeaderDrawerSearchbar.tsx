import SearchIcon from "@mui/icons-material/Search";
import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import HeaderSearchbarForm from "../HeaderSearchbarForm";
import Grid from "@mui/material/Grid2";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";

const HeaderDrawerSearchbar = ({
  open,
  onCloseDrawer,
}: {
  open: boolean;
  onCloseDrawer: () => void;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpen = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && search && search.length > 0) {
      handleCloseDrawer();
      navigate(`/products/search?query=${search}`);
    }
  };
  const handleClick = () => {
    if (search && search.length > 0) {
      onCloseDrawer();
      navigate(`/products/search/${search}`);
    }
  };

  return (
    <>
      <Drawer
        variant="temporary"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiDrawer-paper": {
            p: 3,
          },
        }}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
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
        size={{ xs: "grow" }}
        container
        sx={{
          justifyContent: "flex-end",
          display: { xs: "flex", md: "none" },
        }}
      >
        <BorderIconButton
          onClick={handleOpen}
          size="small"
          tooltipTitle="Search"
        >
          <SearchIcon />
        </BorderIconButton>
      </Grid>
    </>
  );
};

export default HeaderDrawerSearchbar;
