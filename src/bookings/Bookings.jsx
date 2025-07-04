import React from "react";
import styles from "./Bookings.module.css";
import BookingTable from "./BookingTable";
import BookingDetailsTable from "./BookingDetailsTable";

const Bookings = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>All bookings</h2>

          <div className={styles.filters}>
            <div className={styles.filter1}>
              <button className={styles.primary} disabled>
                All
              </button>
              <button className={styles.secondary}>Checked out</button>
              <button className={styles.secondary}>Checked in</button>
              <button className={styles.secondary}>Unconfirmed</button>
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
          <BookingTable />
           <div className={styles.footer}>
          <p className={styles.totalPage}>Showing 1 to 10 of 851 results</p>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-left-icon lucide-chevron-left"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        </div>
       
      </div>
      {/* <BookingDetailsTable/> */}
    </>
  );
};

export default Bookings;
