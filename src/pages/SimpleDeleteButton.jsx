import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import { HiTrash } from "react-icons/hi2";

function SimpleDeleteButton({ cabinId }) {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      alert("Cabin deleted!");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "An error occurred");
    },
  });

  function handleClick() {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    mutate(cabinId);
  }

  return (
    <>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Deleting..." : ""}<HiTrash/>
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
}

export default SimpleDeleteButton;
