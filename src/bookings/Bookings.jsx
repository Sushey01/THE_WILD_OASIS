import React, { useState, useEffect } from "react"; 
import styles from "./Bookings.module.css";
import BookingTable from "./BookingTable";
import BookingDetailsTable from "./BookingDetailsTable";
import useBookings from "../bookings/useBookings"; 

const Bookings = () => {
  const { bookings: originalBookings, isLoading, error } = useBookings();

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");



  const handleFilter = (type) => {
    if (!originalBookings) return
    setActiveFilter(type);

    switch (type) {
      case "checked-in":
        setFilteredBookings(originalBookings.filter((b) => b.status === "checked-in"));
        break;
      case "checked-out":
        setFilteredBookings(originalBookings.filter((b) => b.status === "checked-out"));
        break;
      case "unconfirmed":
        setFilteredBookings(originalBookings.filter((b) => b.status === "unconfirmed")); 
        break;
      case "all":
      default:
        setFilteredBookings(originalBookings);
        break;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>All bookings</h2>

          <div className={styles.filters}>
            <div className={styles.filter1}>
              <button
                className={activeFilter === "all" ? styles.primary : styles.secondary}
                onClick={() => handleFilter("all")} // ❌ You had a typo: `onclick` → should be `onClick`
              >
                All
              </button>
              <button
                className={activeFilter === "checked-out" ? styles.primary : styles.secondary}
                onClick={() => handleFilter("checked-out")}
              >
                Checked out
              </button>
              <button
                className={activeFilter === "checked-in" ? styles.primary : styles.secondary}
                onClick={() => handleFilter("checked-in")}
              >
                Checked in
              </button>
              <button
                className={activeFilter === "unconfirmed" ? styles.primary : styles.secondary}
                onClick={() => handleFilter("unconfirmed")}
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
          <BookingTable bookings={filteredBookings} isLoading={isLoading} error={error} />
          <div className={styles.footer}>
            <p className={styles.totalPage}>Showing 1 to 10 of {filteredBookings?.length || 0} results</p>
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
                  className="lucide lucide-chevron-left-icon lucide-chevron-left"
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
                  className="lucide lucide-chevron-right-icon lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
