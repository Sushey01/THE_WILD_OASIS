import React from "react";
import styles from "./BookingTable.module.css";
import useBookings from "./useBookings";

const BookingTable = () => {
  const { bookings, isLoading, error } = useBookings();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings</p>;
  if (!bookings || bookings.length === 0)
    return <p>No data to show at the moment</p>;

  const validBookings = bookings.filter(  // keeps the booking only if booking object exists
    (b) => b && b.guests && b.cabins //b is the temporary element of array for instance
  ); //true or false

  return (
    <form className={styles.details}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th>CABIN</th>
            <th>GUEST</th>
            <th>DATES</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {validBookings.map((booking, index) => {
            const {
              id,
              startDate,
              endDate,
              numNights,
              totalPrice,
              status,
              guests: { fullName, email },
              cabins: { name: cabinName },
            } = booking;

            return (
              <tr key={id || index}>
                <td>{cabinName}</td>
                <td>
                  {fullName}
                  <br />
                  <small>{email}</small>
                </td>
                <td>
                  {startDate} - {endDate}
                  <br />
                  <small>{numNights} nights</small>
                </td>
                <td>
                  <span className={styles[statusToTagName[status]]}>
                    {status}
                  </span>
                </td>
                <td>${totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </form>
  );
};

export default BookingTable;
