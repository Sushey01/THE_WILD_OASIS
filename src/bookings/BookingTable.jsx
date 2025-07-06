import React, { useState } from "react";
import styles from "./BookingTable.module.css";
import BookingDetails from "./BookingDetails";
import { useNavigate } from "react-router-dom";


import useBookings from "./useBookings";

const BookingTable = () => {
  const { bookings, isLoading, error } = useBookings();
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const navigate=useNavigate()

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
                          <button className={styles.dropdownItem} onClick={()=>navigate(`/seedetails/${id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                            See details
                          </button>
                          <button className={styles.dropdownItem} onClick={()=>navigate("/checkin")}>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z"></path></svg>
                            Check in
                          </button>
                          <button className={styles.dropdownItem}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
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
