import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getCabins, deleteCabin } from "../services/apiCabins";
import SimpleDeleteButton from "./SimpleDeleteButton";
import { toast } from "react-hot-toast"; 
import CabinForm from "./CabinForm";

const supabaseUrl =
  "https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/";

function CabinTable() {
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

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading) return <p>Loading cabins...</p>;
  if (error) return <p>Error loading cabins: {error.message}</p>;

  return (
    <div>
      <h2>All Cabins</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cabins.map((cabin) => {
          const imageUrl = cabin.image?.startsWith("http")
            ? cabin.image
            : `${supabaseUrl}cabin-images/${cabin.image}`;

          const isEditing = editingCabinId === cabin.id;

          return (
            <li key={cabin.id} style={{ marginBottom: "2rem" }}>
              <img
                src={imageUrl}
                alt={cabin.name}
                style={{ width: "300px", borderRadius: "10px" }}
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
                <button onClick={() => setEditingCabinId(isEditing ? null : cabin.id)}>
                  {isEditing ? "Close Edit" : "Edit"}
                </button>

                <SimpleDeleteButton
                  cabinId={cabin.id}
                  isDeleting={isDeleting}
                  onDelete={() => mutate(cabin.id)}
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
    </div>
  );
}

export default CabinTable;
