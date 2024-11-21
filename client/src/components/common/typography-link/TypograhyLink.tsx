import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "@mui/material";
import ReactLink from "../react-link/ReactLink";
import { styled } from "@mui/material/styles";

const TypograhyLink = styled(Typography)<TypographyProps>(() => (
  <ReactLink></ReactLink>
));

const TypograhyLink = ({
  to,
  children,
  variant = "body1",
  color = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: TypographyProps["variant"];
  color?: TypographyProps["color"];
}) => {
  return (
    <Typography component={ReactLink} to={to} variant={variant} color={color}>
      {children}
    </Typography>
  );
};

export default TypograhyLink;
