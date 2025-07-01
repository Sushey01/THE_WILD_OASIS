import supabase, { supabaseUrl } from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

//
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
  .from("settings"
    .update(newSetting))
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  .eq("id", 1)
  .single();
  //return data as a single object instead of an array of objects. single()

  if (error){
    console.error(error);
    throw new Error("Settings")
  }
}
