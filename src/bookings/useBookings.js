import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBoookings"; // Ensure correct spelling
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();

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

  // ✅ QUERY BOOKINGS
  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
    retry: false, // Optional: disables automatic retry
  });

  // ✅ Handle different response shapes safely
  const bookings = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  return { bookings, isLoading, error };
};

export default useBookings;
