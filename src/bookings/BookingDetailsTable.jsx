import React from 'react'
import styles from "./BookingDetailsTable.module.css"
import BookingDetailsRow from './BookingDetailsRow';

const BookingDetailsTable = () => {
  return (
    <div className={styles.mainContainer}>
    <BookingDetailsRow/>
    <div className={styles.container}>
      
     <div className={styles.rowContainer}>
      {/* Guest Info */}
      <div className={styles.guestHeader}>
        <p className={styles.guestName}>rises sky + 9 guests</p>
        <p className={styles.email}>• risessky@gmail.com</p>
        <p className={styles.nationalId}>• National ID asghar</p>
      </div>

      {/* Observations */}
      <div className={styles.observation}>
        <p className={styles.label}>Observations</p>
        <p className={styles.value}>yess i am asghar</p>
      </div>

      {/* Booking Extras */}
      <div className={styles.extraDetail}>
        <p className={styles.label}>Breakfast included?</p>
        <p className={styles.value}>No</p>
      </div>

      {/* Pricing Info */}
      <div className={styles.priceDetail}>
        <div className={styles.price1}>

        <p className={styles.label}>Total price</p>
        <p className={styles.price}>$4,200.00</p>
        </div>
        <p className={styles.payment}>Will pay at property</p>
      </div>

      {/* Booking Time */}
      <div className={styles.bookedTime}>
        <p>Booked Tue, May 13 2025, 4:53 PM</p>
      </div>
    </div>
    <div className={styles.footer}>
        <button className={styles.button1}>check in</button>
        <button className={styles.button2}>Delete booking</button>
        <button className={styles.button3}>Back</button>
    </div>
    </div>
    </div>
  );
};


export default BookingDetailsTable
