import React from 'react'
import styles from "./BookingDetailsRow"

const BookingDetailsRow = () => {
  return (
    <>
    <div className={styles.row}>
      <div className={styles.title}>
        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"></path></svg>
        <h3>3 nights in Cabin</h3>
        <h3>008</h3>
      </div>

      <h1>Fri, Dec 27 2030 (In over 5 years) -- Mon, Dec 30 2030</h1>
    </div>
    <div className={styles.footer}>
        <button className={styles.button1}>check in</button>
        <button className={styles.button2}>Delete booking</button>
        <button className={styles.button3}>Back</button>
    </div>
    </>
  )
}

export default BookingDetailsRow
