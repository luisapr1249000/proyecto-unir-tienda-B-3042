import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

export const ButtonLink = ({ children, ...props }: ButtonProps & LinkProps) => {
  return (
    <Button component={Link} {...props}>
      {children}
    </Button>
  );
};

export const LinkIconButton = ({
  children,
  ...props
}: IconButtonProps & LinkProps) => {
  return (
    <IconButton component={Link} {...props}>
      {children}
    </IconButton>
  );
};
