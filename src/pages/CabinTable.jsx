import React from "react";


import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCabins,
  deleteCabin,
} from "../services/apiCabins";
import SimpleDeleteButton from "./SimpleDeleteButton";

const supabaseUrl =
  "https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/";

function CabinTable() {
  const queryClient = useQueryClient();

  // Fetch all cabins
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // Handle deletion
  const { isloading: isDeleting, mutate } = useMutation(deleteCabin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
    },
  });

  if (isLoading) return <p>Loading cabins...</p>;
  if (error) return <p>Error loading cabins: {error.message}</p>;

  return (
    <div>
      <h2>All Cabins</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cabins.map((cabin) => {
          const imageUrl = supabaseUrl + "cabin-images/" + cabin.image;

          return (
            <li key={cabin.id} style={{ marginBottom: "2rem" }}>
              <img
                src={imageUrl}
                alt={cabin.name}
                style={{ width: "300px", borderRadius: "10px" }}
              />
              <h3>{cabin.name}</h3>
              <h3>{cabin.description}</h3>
              <p>Max Capacity: {cabin.maxCapacity}</p>
              <p>Price: ${cabin.regularPrice}</p>
              <p>Discount: {cabin.discount}%</p>
          <SimpleDeleteButton cabinId={cabin.id} />

            </li>
          );
        })}
      </ul>

      {/* .div$*4  */}
    </div>
  );
}

export default CabinTable;
