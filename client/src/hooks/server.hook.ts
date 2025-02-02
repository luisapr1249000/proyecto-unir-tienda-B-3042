import { useQuery } from "@tanstack/react-query";
import { getServerStatus } from "../api/status.server.api";

export const useServerStatus = () =>
  useQuery({
    queryKey: ["server-status"],
    queryFn: getServerStatus,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
