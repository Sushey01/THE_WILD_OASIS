import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBoookings";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../services/useUser"; // import the user hook

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const { user, isLoading: userLoading } = useUser(); // get user status

  // ✅ FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // ✅ SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // ✅ QUERY BOOKINGS — only after user is loaded
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
    enabled: !!user && !userLoading, // <- key fix
    retry: false,
  });

  const bookings = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  return { bookings, isLoading, error };
};

export default useBookings;
