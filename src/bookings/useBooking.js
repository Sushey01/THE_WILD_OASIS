import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../services/apiBoookings';
import { useParams } from 'react-router-dom';

const useBooking = () => {
  const { id } = useParams(); // your route param is "id"

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
    retry: false,
    enabled: !!id, // only run query if id exists
  });

  return { isLoading, error, booking: data };
};

export default useBooking;
