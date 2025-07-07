import supabase from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)`
    )
    

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  if (!data) {
    throw new Error("No bookings found");
  }
  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        id,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        status,
        totalPrice,
        isPaid,
        hasBreakfast,
        observations,
        guests(fullName, email, nationalID),
        cabins(name)
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(error || "No booking found");
    throw new Error("Booking not found");
  }

  return data;
}
