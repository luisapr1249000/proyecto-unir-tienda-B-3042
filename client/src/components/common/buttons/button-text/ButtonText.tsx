import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ButtonTxt = styled(Button)<ButtonProps>(() => ({
  textTransform: "none",
}));
