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



export async function deleteCabin(id) {
  console.log("Trying to delete cabin with id:", id);

  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();
    

  console.log("Supabase delete response:", { data, error });

  if (error) {
    console.error("Supabase delete error:", error.message);
    throw new Error("Cabin could not be deleted");
  }

  if (!data || data.length === 0) {
    throw new Error("No cabin was deleted — check if ID is correct or permissions");
  }

  return data;
}
