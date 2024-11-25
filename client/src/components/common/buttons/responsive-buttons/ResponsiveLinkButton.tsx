import { Button } from "@mui/material";
import React, { ReactNode } from "react";
import ReactLink from "../../react-link/ReactLink";

const ResponsiveLinkButton = ({
  children,
  to,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <Button
      color="inherit"
      sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
      component={ReactLink}
      to={to}
    >
      {children}
    </Button>
  );
};

export default ResponsiveLinkButton;
