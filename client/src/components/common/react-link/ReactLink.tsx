import { Link as MuiLink, LinkProps } from "@mui/material";
import { Link as ReactLink_ } from "react-router-dom";
import { styled } from "@mui/system";

export const Link = (props: LinkProps) => (
  <MuiLink {...props} component={ReactLink_} to={props.href ?? "#"} />
);

const ReactLink = styled(ReactLink_)({
  textTransform: "none",
  color: "#000",
  textDecoration: "none",
});
export default ReactLink;
