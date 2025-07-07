import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services/apiBoookings';  // named import!

const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    retry: false,
  });
};

export default useBookings;
