// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { createCabin } from "../services/apiCabins";
// import { createEditCabin } from "../services/apiCabins";


// function CabinFormV1({cabinToEdit}) {

//     const {id:editId, ...editValues} =cabinToEdit;

//     const isEditSession = Boolean(editId)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     defaultValues: isEditSession ? editValues : {}
//   });

//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("New Cabin successfully created");
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const onSubmit = (data) => {
//     const newData = {...data,image: data.image[0]}
//     mutate(...newData,editId );
//   };

//   const onError = (errors) => {
//     toast.error("Please fix the validation errors.");
//     console.log(errors);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit, onError)} style={formStyle}>
//       <h3>Add New Cabin</h3>

//       <input
//         type="text"
//         placeholder="Cabin name"
//         {...register("name", { required: "Cabin name is required" })} //register: Connects input fields to the form state
//       />
//       {errors?.name?.message && <Error>{errors.name.message}</Error>}

//       <input
//         type="number"
//         placeholder="Max Capacity"
//         required="this field is required"
//         {...register("maxCapacity", {
//           required: "Max capacity is required",
//           min: { value: 1, message: "Must be at least 1" },
//         })}
//       />
//       {errors.maxCapacity && (
//         <small style={errorStyle}>{errors.maxCapacity.message}</small>
//       )}

//       <input
//         type="number"
//         placeholder="Price"
//         {...register("regularPrice", {
//           required: "Price is required",
//           min: { value: 1, message: "Price must be at least 1" },
//         })}
//       />
//       {errors.regularPrice && (
//         <small style={errorStyle}>{errors.regularPrice.message}</small>
//       )}

//       <input
//         type="number"
//         placeholder="Discount"
//         {...register("discount", {
//           required: "Discount is required",
//           validate: (value) =>
//             value <= getValues("regularPrice") ||
//             "Discount should be less than regular price",
//         })}
//       />

//       {errors.discount && (
//         <small style={errorStyle}>{errors.discount.message}</small>
//       )}

//       <textarea
//         placeholder="Description"
//         {...register("description", {
//           required: "Description is required",
//         })}
//       />
//       {errors.description && (
//         <small style={errorStyle}>{errors.description.message}</small>
//       )}

//       <input
//         id="Image"
//         accept="image/*"
//         type="file"
//         {...register("image", {
//           required: isEditSession ? false : "This field is required",
//         })}
//       />
//       {errors.image && <small style={errorStyle}>{errors.image.message}</small>}

//       {/* <button type="submit">Submit</button> */}
//      <div>
//   <button type="button" onClick={() => { reset(); onClose?.(); }}>
//     Cancel
//   </button>
// <button type="submit" disabled={isLoading}>
//   {isEditSession ? "Update Cabin" : "Create Cabin"}
// </button>
// </div>

//     </form>
//   );
// }

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   marginBottom: "2rem",
//   maxWidth: "400px",
// };

// const errorStyle = {
//   color: "red",
//   fontSize: "0.85rem",
// };

// export default CabinFormV1;
