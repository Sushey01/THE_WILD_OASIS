import React, { useState } from "react";
import styles from "./Bookings.module.css";
import BookingTable from "./BookingTable";
import useBookings from "../bookings/useBookings";

const Bookings = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filter = activeFilter === "all"
    ? null
    : { field: "status", value: activeFilter };

  const {  bookings, isLoading, error } = useBookings(filter);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2 className={styles.title}>All bookings</h2>

        <div className={styles.filters}>
          <div className={styles.filter1}>
            <button
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? styles.primary : styles.secondary}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("checked-out")}
              className={activeFilter === "checked-out" ? styles.primary : styles.secondary}
            >
              Checked out
            </button>
            <button
              onClick={() => setActiveFilter("checked-in")}
              className={activeFilter === "checked-in" ? styles.primary : styles.secondary}
            >
              Checked in
            </button>
            <button
              onClick={() => setActiveFilter("unconfirmed")}
              className={activeFilter === "unconfirmed" ? styles.primary : styles.secondary}
            >
              Unconfirmed
            </button>
          </div>

          <div className={styles.filter2}>
            <select>
              <option>Sort by date (recent first)</option>
              <option>Sort by date (earlier first)</option>
              <option>Sort by amount (high first)</option>
              <option>Sort by amount (low first)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <BookingTable bookings={bookings} isLoading={isLoading} error={error} />

        <div className={styles.footer}>
          <p className={styles.totalPage}>
            Showing 1 to 10 of {bookings?.length || 0} results
          </p>
          <div className={styles.buttons}>
            <button className={styles.button1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                color="#E5E7EB"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Previous
            </button>
            <button className={styles.button2}>
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                color="#E5E7EB"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
