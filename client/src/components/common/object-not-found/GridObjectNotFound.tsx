import React from "react";
import Grid from "@mui/material/Grid2";
import ObjectNotFound from "./ObjectNotFound";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";

const GridObjectNotFound = (props: {
  object: "Product" | "User" | "Comment" | "Category" | "Page";
  onReload: () => void;
  multiple?: boolean;
}) => (
  <Grid sx={{ ...gridContainerCenter }}>
    <ObjectNotFound {...props} />
  </Grid>
);
export default GridObjectNotFound;
