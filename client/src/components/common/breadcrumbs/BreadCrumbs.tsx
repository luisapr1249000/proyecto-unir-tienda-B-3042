import { Breadcrumbs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../react-link/Link";

const BreadCrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const crumbs = paths.map((path, index) => {
    if (index === 0) return path;
    return path.charAt(0) + path.slice(1);
  });

  return (
    <Breadcrumbs>
      {crumbs.map((crumb, index) => (
        <Link
          variant="body2"
          underline="none"
          key={index}
          to={crumbs.slice(0, index + 1).join("/")}
        >
          {crumb}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
