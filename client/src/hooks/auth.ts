import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../api/auth.api";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
