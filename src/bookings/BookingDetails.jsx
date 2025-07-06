import React from 'react'
import styles from "./BookingDetails.module.css"; // ✅
import BookingDetailsRow from './BookingDetailsRow'
import BookingDetailsTable from './BookingDetailsTable'

const BookingDetails = () => {
  const {booking, isLoading} = useBooking()


  if (isLoading) return <h1>ERRORRRR</h1>

  return (
    <div className={styles.details}>
        <div className={styles.head}>
      <h1 className={styles.title}>
        Booking #
      </h1>
      <button>UNCONFIRMED</button>
        </div>

        <div className={styles.back}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <button>Back</button>
        </div>
        
    </div>
  )
}

export default BookingDetails
