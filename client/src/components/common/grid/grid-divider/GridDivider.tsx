import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid2";
import { Divider } from "@mui/material";

const GridDivider = ({ children }: { children?: ReactNode }) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Divider>{children}</Divider>
    </Grid>
  );
};

export default GridDivider;
