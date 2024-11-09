import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserByUsername } from "../api/user.api";

export const useGetUser = ({
  queryKey,
  isUsername = false,
  query,
}: {
  queryKey: string[];
  query: string;
  isUsername?: boolean;
}) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => (isUsername ? getUserByUsername(query) : getUserById(query)),
  });
};
