import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services/apiBoookings';  // named import!

const useBookings = () => {
  // const [searchParams] = useSearchParams();

  // //FILTER
  // const filterValue = searchParams.get("status");


  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    retry: false,
  });
};

export default useBookings;
