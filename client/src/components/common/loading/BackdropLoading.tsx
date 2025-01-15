import { Backdrop, CircularProgress, Typography } from "@mui/material";
import React from "react";

const BackdropLoading = ({ message }: { message: string }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      })}
      open={true}
    >
      <CircularProgress color="inherit" />
      {message && <Typography variant="body2">{message} ...</Typography>}
    </Backdrop>
  );
};

export default BackdropLoading;
