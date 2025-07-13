// import React from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../services/apiCabins";
// import "../cabins/AddCabin.css"

// export default function CabinForm({ cabinToEdit = {}, onClose }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       cabinname: "",
//       capacity: "",
//       price: "",
//       discount: 0,
//       website: "",
//       ...editValues,
//     },
//   });

//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: ({ data, id }) => createEditCabin(data, id),
//     onSuccess: () => {
//       toast.success(`Cabin ${isEditSession ? "updated" : "created"} successfully`);
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//       if (onClose) onClose();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image?.[0];
//     const formData = { ...data, image };
//     mutate({ data: formData, id: editId });
//   }

//   function onError() {
//     toast.error("Please fix the errors in the form.");
//   }

//   return (
//     <div className="cabin-container">
//       <form className="cabin-form" onSubmit={handleSubmit(onSubmit, onError)}>
//         <button
//           type="button"
//           className="cross-button"
//           onClick={() => onClose && onClose()}
//           aria-label="Close form"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-x-icon lucide-x"
//           >
//             <path d="M18 6 6 18" />
//             <path d="m6 6 12 12" />
//           </svg>
//         </button>

//         <div className="cabinInput">
//           <label>Cabin name</label>
//           <input
//             className="InputBox"
//             type="text"
//             {...register("cabinname", { required: "Cabin name is required" })}
//           />
//         </div>
//         {errors.cabinname && <p style={{ color: "red" }}>{errors.cabinname.message}</p>}

//         <div className="cabinInput">
//           <label>Maximum capacity</label>
//           <input
//             className="InputBox"
//             type="number"
//             {...register("capacity", {
//               required: "Capacity is required",
//               min: { value: 1, message: "Minimum capacity is 1" },
//             })}
//           />
//         </div>
//         {errors.capacity && <p style={{ color: "red" }}>{errors.capacity.message}</p>}

//         <div className="cabinInput">
//           <label>Regular price</label>
//           <input
//             className="InputBox"
//             type="number"
//             {...register("price", {
//               required: "Price is required",
//               min: { value: 1, message: "Price must be at least 1" },
//             })}
//           />
//         </div>
//         {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

//         <div className="cabinInput">
//           <label>Discount</label>
//           <input
//             className="InputBox"
//             type="number"
//             {...register("discount", {
//               required: "Discount is required",
//               validate: (value) =>
//                 value <= getValues("price") || "Discount must be less than or equal to price",
//             })}
//           />
//         </div>
//         {errors.discount && <p style={{ color: "red" }}>{errors.discount.message}</p>}

//         <div className="cabinInput">
//           <label>Description for website</label>
//           <input
//             className="InputBox1"
//             type="text"
//             {...register("website", { required: "Description is required" })}
//           />
//         </div>
//         {errors.website && <p style={{ color: "red" }}>{errors.website.message}</p>}

//         <div className="cabinButtons">
//           <label>Cabin photo</label>
//           <div className="primary-buttons">
//             <input
//               type="file"
//               accept="image/*"
//               {...register("image", {
//                 required: !isEditSession ? "Image is required" : false,
//               })}
//               style={{ display: "none" }}
//               id="cabinImage"
//             />
//             <label
//               htmlFor="cabinImage"
//               className="choose-button"
//               style={{ cursor: "pointer" }}
//             >
//               Choose File
//             </label>
//             <button type="button" className="file-button" disabled>
//               No file chosen
//             </button>
//           </div>
//         </div>

//         <div className="main-buttons">
//           <button
//             type="reset"
//             className="cancel-button"
//             disabled={isSubmitting}
//             onClick={() => reset()}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="create-button" disabled={isSubmitting}>
//             {isEditSession ? "Update Cabin" : "Create new cabin"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
