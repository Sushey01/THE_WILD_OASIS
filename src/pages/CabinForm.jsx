import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../services/apiCabins";
import styles from "./CabinForm.module.css";

function CabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Cozy Mountains",
      maxCapacity: "6",
      regularPrice: "150",
      discount: 20,
      description: "Lets have fun",
      ...editValues,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success(`Cabin ${isEditSession ? "updated" : "created"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      if (onClose) onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const formData = { ...data, image };
    mutate({ data: formData, id: editId });
  }

  function onError(errors) {
    console.log(errors);
    toast.error("Please fix the errors in the form.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formContainer}>
      <div className={styles.add}>
      <h3>{isEditSession ? "Edit Cabin" : "Add New Cabin"}</h3>
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
  onClick={onClose} 
  className={styles.closeIcon}  // ✅ Correct in React
>
  <path d="M18 6 6 18"/>
  <path d="m6 6 12 12"/>
</svg>

      </div>

      <input
        type="text"
        placeholder="Cabin name"
        {...register("name", { required: "Cabin name is required" })}
      />
      {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}

      <input
        type="number"
        placeholder="Max Capacity"
        {...register("maxCapacity", {
          required: "Max capacity is required",
          min: { value: 1, message: "At least 1 guest" },
        })}
      />
      {errors.maxCapacity && <p className={styles.errorMessage}>{errors.maxCapacity.message}</p>}

      <input
        type="number"
        placeholder="Price"
        {...register("regularPrice", {
          required: "Price is required",
          min: { value: 1, message: "Price must be at least 1" },
        })}
      />
      {errors.regularPrice && <p className={styles.errorMessage}>{errors.regularPrice.message}</p>}

      <input
        type="number"
        placeholder="Discount"
        {...register("discount", {
          required: "Discount is required",
          validate: (value) =>
            value <= getValues("regularPrice") || "Discount should be less than price",
        })}
      />
      {errors.discount && <p className={styles.errorMessage}>{errors.discount.message}</p>}

      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
      />
      {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}

      <input
        type="file"
        accept="image/*"
        {...register("image", {
          required: !isEditSession ? "Image is required" : false,
        })}
      />
      {errors.image && <p className={styles.errorMessage}>{errors.image.message}</p>}

      <div>
        <button type="reset" disabled={isLoading}>Cancel</button>
        <button type="submit" disabled={isLoading}>
          {isEditSession ? "Update Cabin" : "Create Cabin"}
        </button>
      </div>
    </form>
  );
}

export default CabinForm;
