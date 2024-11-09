import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useMatches } from "react-router-dom";

const BreadCrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.params.username));

  return (
    <Breadcrumbs>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
