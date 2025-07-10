// import { useEffect, useState } from "react";
// import supabase from "../services/supabase"; // adjust path if needed

// const statusColors = {
//   ARRIVING: "#22c55e",
//   DEPARTING: "#3b82f6",
// };

// function formatDate(date) {
//   return new Date(date).toISOString().split("T")[0];
// }

// const TodayActivities = () => {
//   const [guests, setGuests] = useState([]);
//   const today = formatDate(new Date());

//   useEffect(() => {
//     async function fetchTodayBookings() {
//       const { data, error } = await supabase
//         .from("bookings")
//         .select("id, startDate, endDate, numNights, guests(fullName, countryFlag)")
//         .gte("startDate", today)
//         .lte("endDate", today);

//       if (error) {
//         console.error("Error loading today's bookings:", error.message);
//         return;
//       }

//       const mapped = data.map((b) => ({
//         id: b.id,
//         status: b.startDate === today ? "ARRIVING" : "DEPARTING",
//         name: b.guests?.fullName || "Unknown",
//         nights: b.numNights,
//         action: b.startDate === today ? "CHECK IN" : "CHECK OUT",
//         countryCode: b.guests?.countryFlag || "us", // fallback
//       }));

//       setGuests(mapped);
//     }

//     fetchTodayBookings();
//   }, []);

//   return (
//     <div
//       style={{
//         backgroundColor: "#18212f",
//         padding: "20px",
//         borderRadius: "10px",
//         width: "100%",
//         maxWidth: "600px",
//       }}
//     >
//       <h3 style={{ color: "white", marginBottom: "20px" }}>Today</h3>
//       <div>
//         {guests.length === 0 ? (
//           <p style={{ color: "#94a3b8" }}>No guest activity today</p>
//         ) : (
//           guests.map((guest) => (
//             <div
//               key={guest.id}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 backgroundColor: "#18212f",
//                 padding: "10px 15px",
//                 marginBottom: "10px",
//                 borderRadius: "8px",
//                 color: "#f1f5f9",
//               }}
//             >
//               {/* Status pill */}
//               <span
//                 style={{
//                   backgroundColor: statusColors[guest.status],
//                   color: "white",
//                   padding: "3px 8px",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                   borderRadius: "20px",
//                   minWidth: "70px",
//                   textAlign: "center",
//                 }}
//               >
//                 {guest.status}
//               </span>

//               {/* Name */}
//               <div style={{ flex: 1, marginLeft: "15px", fontWeight: 600 }}>
//                 {guest.name}
//               </div>

//               {/* Nights */}
//               <div
//                 style={{
//                   minWidth: "70px",
//                   textAlign: "right",
//                   fontSize: "13px",
//                   opacity: 0.85,
//                 }}
//               >
//                 {guest.nights} nights
//               </div>

//               {/* Action Button */}
//               <button
//                 style={{
//                   backgroundColor: "#6366f1",
//                   color: "white",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   fontWeight: "bold",
//                   fontSize: "12px",
//                   marginLeft: "10px",
//                 }}
//               >
//                 {guest.action}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodayActivities;
