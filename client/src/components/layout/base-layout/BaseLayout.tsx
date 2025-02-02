import Grid from "@mui/material/Grid2";
import React, { ReactNode, useState } from "react";
import { Footer } from "../footer/Footer";
import { Outlet } from "react-router-dom";

export const BaseLayOut = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Grid
        sx={{
          display: "flex",
        }}
      >
        {children}
        <Grid component="main" sx={{ flexGrow: 1 }}>
          <Grid sx={{}}>
            <Outlet />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};
