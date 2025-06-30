import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../services/apiCabins";

// MAIN COMPONENT
function CabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      maxCapacity: "",
      regularPrice: "",
      discount: 0,
      description: "",
      ...editValues,
    },
  });

  useEffect(() => {
    if (isEditSession) {
      reset({ ...editValues, image: "" }); // do not preload image
    }
  }, [editValues, isEditSession, reset]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success(`Cabin ${isEditSession ? "updated" : "created"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      if (onClose) onClose(); // optional: close modal or form
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // Form data to send
    const formData = { ...data, image };

    mutate({ data: formData, id: editId });
  }

  function onError(errors) {
    console.log(errors);
    toast.error("Please fix the errors in the form.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} style={formStyle}>
      <h3>{isEditSession ? "Edit Cabin" : "Add New Cabin"}</h3>

      <input
        type="text"
        placeholder="Cabin name"
        {...register("name", { required: "Cabin name is required" })}
      />
      {errors.name && <p style={errorStyle}>{errors.name.message}</p>}

      <input
        type="number"
        placeholder="Max Capacity"
        {...register("maxCapacity", {
          required: "Max capacity is required",
          min: { value: 1, message: "At least 1 guest" },
        })}
      />
      {errors.maxCapacity && <p style={errorStyle}>{errors.maxCapacity.message}</p>}

      <input
        type="number"
        placeholder="Price"
        {...register("regularPrice", {
          required: "Price is required",
          min: { value: 1, message: "Price must be at least 1" },
        })}
      />
      {errors.regularPrice && <p style={errorStyle}>{errors.regularPrice.message}</p>}

      <input
        type="number"
        placeholder="Discount"
        {...register("discount", {
          required: "Discount is required",
          validate: (value) =>
            value <= getValues("regularPrice") ||
            "Discount should be less than price",
        })}
      />
      {errors.discount && <p style={errorStyle}>{errors.discount.message}</p>}

      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
      />
      {errors.description && <p style={errorStyle}>{errors.description.message}</p>}

      <input
        type="file"
        accept="image/*"
        {...register("image", {
          required: !isEditSession ? "Image is required" : false,
        })}
      />
      {errors.image && <p style={errorStyle}>{errors.image.message}</p>}

      <div>
        <button type="reset" disabled={isLoading}>Cancel</button>
        <button type="submit" disabled={isLoading}>
          {isEditSession ? "Update Cabin" : "Create Cabin"}
        </button>
      </div>
    </form>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem",
  maxWidth: "400px",
};

const errorStyle = {
  color: "red",
  fontSize: "0.85rem",
};

export default CabinForm;
