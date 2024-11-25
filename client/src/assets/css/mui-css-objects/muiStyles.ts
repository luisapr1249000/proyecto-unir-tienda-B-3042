import { CSSObject, SxProps, Theme } from "@mui/material";

export const responsiveDisplay: SxProps = {
  display: { xs: "none", md: "flex" },
};

export const responsiveDisplayIconButtons: SxProps<Theme> = {
  display: { xs: "block", md: "none" },
};

export const gridBreakpoints = { xs: 11, sm: 8, md: 6, lg: 5, xl: 4 };

export const fullHeight: CSSObject = { height: "calc(100vh)" };
