import React from 'react'
import styles from "./Bookings.module.css"
import BookingTable from './BookingTable'
import BookingDetailsTable from './BookingDetailsTable'

const Bookings = () => {
  return (
    <>
    <div className={styles.container}>
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
          <BookingTable/>
          </div>
<BookingDetailsTable/>
          
    </>
  )
}

export default Bookings
