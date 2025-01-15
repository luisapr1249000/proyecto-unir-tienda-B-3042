import { useQuery } from "@tanstack/react-query";
import { getAuthUser, verifyToken } from "../api/auth.api";

export const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 15 * 60 * 1000,
  });

export const useVerifyToken = (token: string) =>
  useQuery({
    queryKey: ["valid-token"],
    queryFn: () => verifyToken(token),
    refetchOnWindowFocus: false,
    retry: false,
  });
