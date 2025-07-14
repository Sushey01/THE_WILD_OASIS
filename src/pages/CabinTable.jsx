import React, { useState, useMemo } from "react";
import "./CabinTable.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getCabins, deleteCabin, createCabin } from "../services/apiCabins";
import SimpleDeleteButton from "./SimpleDeleteButton";
import { toast } from "react-hot-toast";
import CabinForm from "./CabinForm";
import Modal from "./Modal"
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";
import AddCabin from "../cabins/AddCabin";
import ModalLayout from "./Modal";

const supabaseUrl =
  "https://wvrlzurpmqwjezgxjvjc.supabase.co/storage/v1/object/public/";

// Dropdown component with three dots icon and menu
function MoreOptions({ onCopy, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="More options"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          color: "inherit",
        }}
      >
        {/* Your vertical three dots SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-ellipsis-vertical-icon"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>

      {open && (
        <ul
          style={{
            position: "absolute",
            right: 0,
            marginTop: 4,
            listStyle: "none",
            padding: "8px 0",
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: 120,
            zIndex: 100,
          }}
          onMouseLeave={() => setOpen(false)}
        >
          <li
            onClick={() => {
              onCopy();
              setOpen(false);
            }}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              color: "#111",
            }}
          >
            Copy
          </li>
          <li
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              color: "#111",
            }}
          >
            Edit
          </li>
          <li
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            style={{ padding: "8px 12px", cursor: "pointer", color: "#111" }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

function CabinTable({ filterStatus, sortBy }) {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const [editingCabinId, setEditingCabinId] = useState(null);

  const { data: cabins = [], isLoading, error } = useQuery({
    queryKey: ["cabins", filterStatus],
    queryFn: () => getCabins({ status: filterStatus }),
  });

  const sortedCabins = useMemo(() => {
    return [...cabins].sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "capacity_asc":
          return a.max_capacity - b.max_capacity;
        case "capacity_desc":
          return b.max_capacity - a.max_capacity;
        default:
          return 0;
      }
    });
  }, [cabins, sortBy]);

  const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: duplicateCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      // toast.success("Cabin duplicated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins", filterStatus] });
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
      image: cabin.image,
      duplicate: true,
    };

    duplicateCabin(duplicatedCabin, {
      onSuccess: (newCabin) => {
        toast.success("Cabin duplicated");
        queryClient.setQueryData(["cabins", filterStatus], (old) =>
          old ? [...old, newCabin] : [newCabin]
        );
      },
    });
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
        {sortedCabins.map((cabin) => {
          const imageUrl = cabin.image?.startsWith("http")
            ? cabin.image
            : `${supabaseUrl}cabin-images/${cabin.image}`;

          const isEditing = editingCabinId === cabin.id;

          return (
            <li key={cabin.id} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", alignItems: "center", gap: 8 }}>
              <img
                loading="lazy"
                src={imageUrl}
                alt={cabin.name}
                style={{ width: "100px" }}
              />
              <h4>{cabin.name}</h4>
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
                <MoreOptions
                  onCopy={() => handleDuplicate(cabin)}
                  onEdit={() => setEditingCabinId(isEditing ? null : cabin.id)}
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
        {showForm &&   
         
        <ModalLayout>
           <CabinForm />
        </ModalLayout>
        }
   
      
      </div>
    </div>
  );
}

export default CabinTable;
