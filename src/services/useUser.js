import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth'; // Update path as needed

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });

  const isAuthenticated = !!user; // user exists means authenticated

  return { isLoading, user, isAuthenticated };
}
