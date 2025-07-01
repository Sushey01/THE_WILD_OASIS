import supabase, { supabaseUrl } from "./supabase";

// ✅ GET CABINS
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

// ✅ CREATE CABIN
export async function createCabin(newCabin) {
  const { duplicate: _, ...cabinData } = newCabin;
  const isDuplicate = newCabin.duplicate === true;

  let imageName, imagePath;

  if (isDuplicate) {
    imagePath = newCabin.image;
  } else {
    imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Insert cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // ✅ 2. Only upload if not duplicate
  if (!isDuplicate) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded and the cabin was not created");
    }
  }

  return data;
}


//  CREATE OR EDIT CABIN
export async function createEditCabin(newCabin, id) {
  // Check if user uploaded a new file or provided an existing image URL
  const isImageFile = newCabin.image instanceof File;
  let imagePath = newCabin.image;

  let imageName;

  if (isImageFile) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. CREATE or UPDATE
  let query = supabase.from("cabins");

  if (!id) { 
    console.log('fghfghfgh');
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else { 
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be saved");
  }

  // 2. Upload image only if it's a new file
  if (isImageFile) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id); // ✅ FIX: use data.id
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded and the cabin was not saved");
    }
  }

  return data;
}

// ✅ DELETE CABIN
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase delete error:", error.message);
    throw new Error("Cabin could not be deleted");
  }

  if (!data || data.length === 0) {
    throw new Error("No cabin was deleted — check if ID is correct or permissions");
  }

  return data;
}
