import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../services/apiBoookings';  // named import!
import {useSearchParams} from "react-router-dom"

const useBookings = () => {
  console.log("useBookings data:");

  // const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all"
  ? null: {field:"status", value:filterValue};
  // console.log(filter)

  //SORT
  const sortByRaw = searchParams.get("sortBy")  || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction}


  // // PAGINATION
  // const page=!searchParams.get("page")?1:Number(searchParams.get("page"))


  //QUERY
  const {
    isLoading, 
    bookings,
    error,
  }= useQuery({
  queryKey:["bookings", filter],
  queryFn:()=>getBookings({filter})
  })
  return {isLoading, error, bookings, retry: false,}
    

};

export default useBookings;
