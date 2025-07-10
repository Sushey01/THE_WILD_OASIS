import supabase from "./supabase";


const PAGE_SIZE = 10;

export async function getBookings({ filter = null, sortBy = null, page = 1 } = {}) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter)
    query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
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



export async function getBookingsAfterDate(date) {

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price as totalPrice, extras_price as extrasPrice")
    .gte("created_at", date)
    .lte("created_at", new Date(new Date().setHours(23, 59, 59, 999)).toISOString());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }


  if (!(date instanceof Date)) date = new Date(date);
  const startDate = date.toISOString();
  const endDate = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice") // ✅ Use exact camelCase names
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }


  return data;
}
