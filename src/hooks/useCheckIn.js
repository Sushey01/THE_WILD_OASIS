import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInBooking } from "../services/apiBoookings";   // <-- keep your real path/spelling

export default function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation(
    // variables = { id, withBreakfast }
    ({ id, withBreakfast }) => checkInBooking(id, withBreakfast),

    // react-query options
    {
      onSuccess: (updatedBooking) => {
        // Update cache so BookingTable flips to "CHECKED-IN"
        queryClient.setQueryData(["bookings"], (old) =>
          old?.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)),
        );

        // or just:
        // queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
    },
  );
}
