import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import ReactLink from "../../react-link/ReactLink";

const ResponsiveLinkIconButton = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
      component={ReactLink}
      to={to}
    >
      {children}
    </IconButton>
  );
};

export default ResponsiveLinkIconButton;
