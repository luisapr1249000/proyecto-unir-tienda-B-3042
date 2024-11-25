import React, { useEffect } from "react";
import { useNavigatorOnLine } from "../../../hooks/navigatorOnLine.hooks";
import { toast } from "react-toastify";

const NetworkStatusIndicator = () => {
  const isOnline = useNavigatorOnLine();
  useEffect(() => {
    if (!isOnline) toast.warning("You are currently offline");
  }, [isOnline]);
  return null;
};

export default NetworkStatusIndicator;
