import React from "react";
import styles from "./Bookings.module.css";
import BookingTable from "./BookingTable";
import useBookings from "../bookings/useBookings";
import { useSearchParams } from "react-router-dom";

const Bookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get("status") || "all";

  const handleFilterChange = (status) => {
    const newParams = new URLSearchParams(searchParams);
    if (status === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }
    setSearchParams(newParams);
  };

  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", newSort);
    setSearchParams(newParams);
  };

  const { bookings, isLoading, error } = useBookings();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2 className={styles.title}>All bookings</h2>

        <div className={styles.filters}>
          <div className={styles.filter1}>
            <button
              onClick={() => handleFilterChange("all")}
              className={
                activeFilter === "all" ? styles.primary : styles.secondary
              }
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("checked-out")}
              className={
                activeFilter === "checked-out"
                  ? styles.primary
                  : styles.secondary
              }
            >
              Checked out
            </button>
            <button
              onClick={() => handleFilterChange("checked-in")}
              className={
                activeFilter === "checked-in"
                  ? styles.primary
                  : styles.secondary
              }
            >
              Checked in
            </button>
            <button
              onClick={() => handleFilterChange("unconfirmed")}
              className={
                activeFilter === "unconfirmed"
                  ? styles.primary
                  : styles.secondary
              }
            >
              Unconfirmed
            </button>
          </div>

          <div className={styles.filter2}>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="startDate-desc">
                Sort by date (recent first)
              </option>
              <option value="startDate-asc">
                Sort by date (earlier first)
              </option>
              <option value="totalPrice-desc">
                Sort by amount (high first)
              </option>
              <option value="totalPrice-asc">Sort by amount (low first)</option>
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
  );
};

export default Bookings;
