import React from 'react';
import styles from "./BookingDetailsRow.module.css";

const BookingDetailsRow = ({ booking }) => {
  if (!booking) return null;

  const {
    cabins: { name: cabinName },
    numNights,
    startDate,
    endDate,
  } = booking;

  return (
    <div className={styles.row}>
      <div className={styles.title}>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        <p>{numNights} nights in {cabinName}</p>
        {/* You can add more info here if needed */}
      </div>

      <p className={styles.date}>
        {new Date(startDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        {" — "}
        {new Date(endDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  );
};

export default BookingDetailsRow;
