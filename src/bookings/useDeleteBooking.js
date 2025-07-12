// bookings/useDeleteBooking.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../services/apiBoookings";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteBooking,
    onSuccess: () => {
      // ✅ Refresh bookings after deletion
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export default useDeleteBooking;
