

import supabase, { supabaseUrl } from './supabase';




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


export async function createCabin(newCabin){

  // https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "") 
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
 


  // 1. Create Cabin
const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image: imagePath }])
  .select()
  .single()

  
  if (error){
    console.error(error);
    throw new Error("Cabin could not be created");
  }




  
  
  // 2. Upload Image
  const {error: storageError} = await supabase.storage
  .from("cabin-images")
  .upload(imageName, newCabin.image);
  
  
  
  // 3. Delete the cabin if there was an error uploading image
  if(storageError){
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(

      "Cabin image could not be uploaded and the cabin was not created"
    )
  }
  return data;


}





export async function createEditCabin(newCabin, id){

  // https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "") 
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
 


  // 1. Edit Cabin
const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image: imagePath }])
  .select()
  .single()

  
  if (error){
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
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

    