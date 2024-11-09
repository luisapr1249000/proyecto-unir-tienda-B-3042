import { useQuery } from "@tanstack/react-query";
import React from "react";

const BaseProductList = ({ queryKey, queryFunction }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: queryFunction,
  });
  return <div>BaseProductList</div>;
};

export default BaseProductList;
