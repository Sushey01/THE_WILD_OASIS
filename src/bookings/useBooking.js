import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../services/apiBoookings';

const useBooking = (bookingId) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId,
    retry: false,
  });
};

export default useBooking;
