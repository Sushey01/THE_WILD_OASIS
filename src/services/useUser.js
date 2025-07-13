import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./apiAuth";

export function useUser() {
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  return { user, isLoading, error, refetch };
}
