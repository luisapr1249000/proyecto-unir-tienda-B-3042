import { useQuery } from "@tanstack/react-query";
import { getAuthUser, verifyToken } from "../api/auth.api";

export const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useVerifyToken = (token: string) =>
  useQuery({
    queryKey: ["valid-token"],
    queryFn: () => verifyToken(token),
    refetchOnWindowFocus: false,
    retry: false,
  });
