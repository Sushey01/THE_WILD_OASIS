import React, { useState } from "react";
import styles from "./BookingTable.module.css";

import useBookings from "./useBookings";

const BookingTable = () => {
  const { bookings, isLoading, error } = useBookings();
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings</p>;
  if (!bookings || bookings.length === 0)
    return <p>No data to show at the moment</p>;

  const validBookings = bookings.filter((b) => b && b.guests && b.cabins);

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
                  <strong>
                    {startDate} — {endDate}
                  </strong>
                  <br />
                  <small>{numNights} night stay</small>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[statusToTagName[status]]
                    }`}
                  >
                    {status.toUpperCase()}
                  </span>
                </td>
                <td className={styles.amount}>
                  $
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <div className={styles.actions}>
                    <span
                      className={styles.menuTrigger}
                      onClick={() => toggleMenu(id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && toggleMenu(id)}
                    >
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
                      {openMenuId === id && (
                        <div className={styles.dropdown}>
                          <button className={styles.dropdownItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                            See details
                          </button>
                          <button className={styles.dropdownItem}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10m-10 4h10m-5 4v-4"
                              />
                            </svg>
                            Check in
                          </button>
                          <button className={styles.dropdownItem}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Delete booking
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
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
