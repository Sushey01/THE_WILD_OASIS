import React, { useState } from "react";
import "./CabinTable.css"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getCabins, deleteCabin, createCabin } from "../services/apiCabins";
import SimpleDeleteButton from "./SimpleDeleteButton";
import { toast } from "react-hot-toast";
import CabinForm from "./CabinForm";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";

const supabaseUrl =
  "https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/";

function CabinTable() {
    const [showForm, setShowForm] = useState(false);
  // console.log(supabase);
  const queryClient = useQueryClient();
  const [editingCabinId, setEditingCabinId] = useState(null);

  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // Delete mutation
  const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  // Duplicate mutation
  const { mutate: duplicateCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin duplicated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error("Failed to duplicate: " + error.message),
  });

 function handleDuplicate(cabin) {

    const duplicatedCabin = {
      name: `${cabin.name} (Copy)`,
      description: cabin.description,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image, // existing image URL
      duplicate: true // Flag to indicate this is a duplicate


      // const {name, description, maxCapacity, regularPrice, discount, image} = cabin,
      // name: `Copy of ${name}`,
      // maxCapacity,
      // regularPrice,
      // discount,
      // image,
      // description,
    };

    duplicateCabin(duplicatedCabin, {
      onSuccess:(newCabin)=>{
        toast.success("Cabin duplicated");
        queryClient.setQueryData(["Cabins"], (old)=>[...old, newCabin])
      }
    })
  }

  if (isLoading) return <p>Loading cabins...</p>;
  if (error) return <p>Error loading cabins: {error.message}</p>;

  return (
    <div className="cabin-table">
      <div className="cabin-header">
        <p>CABIN</p>
        <p>CAPACITY</p>
        <p>PRICE</p>
        <p>DISCOUNT</p>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cabins.map((cabin) => {
          const imageUrl = cabin.image?.startsWith("http")
            ? cabin.image
            : `${supabaseUrl}cabin-images/${cabin.image}`;

          const isEditing = editingCabinId === cabin.id;

          return (
            <li key={cabin.id}>
              <img
              loading="lazy"
                src={imageUrl}
                alt={cabin.name}
                style={{ width: "100px" }}
              />
              <h3>{cabin.name}</h3>
              <p>{cabin.description}</p>
              <p>Max Capacity: {cabin.maxCapacity}</p>
              <p>Price: ${cabin.regularPrice}</p>
              <p>
                Discount:{" "}
                {typeof cabin.discount === "number" && cabin.discount > 0
                  ? `${cabin.discount}%`
                  : "—"}
              </p>
              <div>
                <button onClick={() => handleDuplicate(cabin)}><HiSquare2Stack/></button>

                <button
                  onClick={() =>
                    setEditingCabinId(isEditing ? null : cabin.id)
                  }
                >
                  {isEditing ? "Close Edit" : ""}<HiPencil/>
                </button>

                <SimpleDeleteButton
                  cabinId={cabin.id}
                  isDeleting={isDeleting}
                  onDelete={() => deleteCabinMutate(cabin.id)}
                />
              </div>

              {isEditing && (
                <CabinForm
                  cabinToEdit={cabin}
                  onClose={() => setEditingCabinId(null)}
                />
              )}
            </li>
          );
        })}
        
      </ul>
      <div className="cabin-button">

            <button onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close Form" : "Add New Cabin"}
      </button>
      {showForm && <CabinForm />} {/* ⬅️ Show the form when showForm is true */}
      </div>
      
    </div>
  );
}

export default CabinTable;
