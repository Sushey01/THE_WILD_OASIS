import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase
    .from('cabins')
    .select('*'); // selecting all cabins

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins; // return cabins, not data
}
