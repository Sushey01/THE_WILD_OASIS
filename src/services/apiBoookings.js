
import supabase from "../services/supabase"

const PAGE_SIZE = 10;

export async function getBookings({ filter = null, sortBy = null, page = 1 } = {}) {
  let query = supabase
    .from("bookings")
  .select(
  `
    id,
    created_at,
    start_date as startDate,
    end_date as endDate,
    num_nights as numNights,
    num_guests as numGuests,
    status,
    total_price as totalPrice,
    cabins(name),
    guests(full_name as fullName, email)
  `,
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
    start_date as startDate,
    end_date as endDate,
    num_nights as numNights,
    num_guests as numGuests,
    status,
    total_price as totalPrice,
    isPaid,
    hasBreakfast,
    observations,
    guests( full_name as fullName, email, nationalID),
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



export async function getBookingsAfterDate(date){
  const {data, error} = await supabase
  .from("bookings")
  .select("created_at, totalPrice, extrasPrice")
  .gte("created_at", date)
  .lte("created_at", getToday({end:true}))


if (error){
  console.error(error);
  throw new Error("Bookings could not get loaded")
}

return data;

}
