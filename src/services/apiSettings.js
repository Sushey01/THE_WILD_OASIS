import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}


export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")             // ✅ Correct: this returns the table reference
    .update(newSetting)           // ✅ Then you update
    .eq("id", 1)                  // ✅ Specify the row
    .single();                    // ✅ Ensures you get a single object (not an array)

  if (error){
    console.error(error);
    throw new Error("Settings could not be updated ");
  }

  return data;
}


