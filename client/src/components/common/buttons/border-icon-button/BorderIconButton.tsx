import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

type BorderIconButtonProps = IconButtonProps & {
  tooltipTitle: string;
};

export const BorderIconButton = ({
  tooltipTitle,
  children,
  ...props
}: BorderIconButtonProps) => (
  <>
    <Tooltip title={tooltipTitle}>
      <IconButton
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3.2,
          boxShadow: 2,
        }}
        {...props}
      >
        {children}
      </IconButton>
    </Tooltip>
  </>
);
export default BorderIconButton;
