import React from "react";
import styles from "./CheckinBooking.module.css";
import BookingDetailsTable from "./BookingDetailsTable";
import BookingDetails from "./BookingDetails";

const CheckinBooking = () => {
  return (
    <>
      <div className={styles.checkin}>
        <BookingDetails />

        <div className={styles.checkbox1}>
          <input type="checkbox" />
          <p>Want to add breakfast for $450.00?</p>
        </div>
        <div className={styles.checkbox2}>
          <input type="checkbox" />
          <p>I confirm that rises sky has paid the total amount of $4200.00</p>
        </div>
    
      <div className={styles.buttons}>
        <button className={styles.checkbutton}>Check in booking #2719</button>
        <button className={styles.back}>Back</button>
      </div>
        </div>
    </>
  );
};

export default CheckinBooking;
