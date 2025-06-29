import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function CabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Replace this with an API call if needed
    console.log("Submitted cabin:", data);
    toast.success("Cabin submitted!");
    reset(); // Clear form
  };

  const onError = (errors) => {
    toast.error("Please fix the validation errors.");
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} style={formStyle}>
      <h3>Add New Cabin</h3>

      <input
        type="text"
        placeholder="Cabin name"
        {...register("name", { required: "Cabin name is required" })}
      />
      {errors.name && <small style={errorStyle}>{errors.name.message}</small>}

      <textarea
        placeholder="Description"
        {...register("description")}
      />

      <input
        type="number"
        placeholder="Price"
        {...register("regularPrice", {
          required: "Price is required",
          min: { value: 1, message: "Price must be at least 1" },
        })}
      />
      {errors.regularPrice && (
        <small style={errorStyle}>{errors.regularPrice.message}</small>
      )}

      <input
        type="number"
        placeholder="Max Capacity"
        {...register("maxCapacity", {
          required: "Max capacity is required",
          min: { value: 1, message: "Must be at least 1" },
        })}
      />
      {errors.maxCapacity && (
        <small style={errorStyle}>{errors.maxCapacity.message}</small>
      )}

      <button type="submit">Submit</button>
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
