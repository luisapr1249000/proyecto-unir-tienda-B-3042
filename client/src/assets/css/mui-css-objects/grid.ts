import { SxProps, Theme } from "@mui/material";

export const GridResponsive = {
  xs: 12,
  sm: 8,
  md: 7,
  lg: 6,
  xl: 4,
};

export const GridStyleResponsive: SxProps<Theme> = {
  height: "calc(100vh - 64px)",
  justifyContent: { xs: "flex-start", md: "center" },
  alignItems: { xs: "flex-start", md: "center" },
};

export const GridBorderRadious = {
  borderRadius: 2,
  // border: 1,
  // borderColor: "divider",
};
