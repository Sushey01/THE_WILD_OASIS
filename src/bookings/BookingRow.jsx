// const BookingRow = ({ booking }) => {
//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver"
//   };

//   return (
//     <tr key={booking.id}>
//       <td>{booking.cabins.name}</td>
//       <td>
//         {booking.guests.fullName}
//         <br />
//         <small>{booking.guests.email}</small>
//       </td>
//       <td>
//         {booking.startDate} - {booking.endDate}
//         <br />
//         <small>{booking.numNights} nights</small>
//       </td>
//       <td>
//         <span className={statusToTagName[booking.status]}>
//           {booking.status}
//         </span>
//       </td>
//       <td>${booking.totalPrice}</td>
//     </tr>
//   );
// };
