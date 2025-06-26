import supabase from "./supabase";

export async function getBooking(id){
    const {data, error} = await supabase
    .from("bookings")
    .select("id", id)
    .eq("id", id)
    .single();



    if(error){
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
}