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

  const validBookings = bookings.filter(
    (b) => b && b.guests && b.cabins
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th>CABIN</th>
            <th>GUEST</th>
            <th>DATES</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
            <th></th>
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
              <tr key={id || index} className={styles.row}>
                <td>{cabinName}</td>
                <td>
                  <strong>{fullName}</strong>
                  <br />
                  <small>{email}</small>
                </td>
                <td>
                  <strong>{startDate} — {endDate}</strong>
                  <br />
                  <small>{numNights} night stay</small>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[statusToTagName[status]]}`}>
                    {status.toUpperCase()}
                  </span>
                </td>
                <td className={styles.amount}>
                  ${totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className={styles.actions}>
                  <button className={styles.menuButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
