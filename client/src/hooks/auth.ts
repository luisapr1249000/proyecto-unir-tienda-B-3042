import { useQuery } from "@tanstack/react-query";
import { getAuthUser, validateToken } from "../api/auth.api";

export const useGetAuthUser = (isForLogin = false) =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: isForLogin ? getAuthUser : undefined,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 15 * 60 * 1000,
  });

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
    queryFn: () => validateToken(token),
    refetchOnWindowFocus: false,
    retry: false,
  });
