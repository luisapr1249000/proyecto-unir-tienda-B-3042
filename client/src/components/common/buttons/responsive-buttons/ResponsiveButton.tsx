import { IconButton, styled, IconButtonProps } from "@mui/material";
import React, { ReactNode } from "react";
export const ResponsiveButton = styled(IconButton)<IconButtonProps>(
  ({ theme }) => ({
    display: "block", // Default display
    [theme.breakpoints.up("sm")]: {
      display: "none", // Hide on small screens and up
    },
  })
);
const ResponsiveIconButton = ({ children }: { children: ReactNode }) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
    >
      {children}
    </IconButton>
  );
};

export default ResponsiveIconButton;
