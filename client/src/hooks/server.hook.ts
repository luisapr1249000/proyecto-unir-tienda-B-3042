import { useQuery } from "@tanstack/react-query";
import { getServerStatus } from "../api/status.server.api";

export const useServerStatus = () =>
  useQuery({ queryKey: ["server-status"], queryFn: getServerStatus });
