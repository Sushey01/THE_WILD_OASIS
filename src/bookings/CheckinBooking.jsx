import React from "react";
import styles from "./CheckinBooking.module.css";
import BookingDetailsTable from "./BookingDetailsTable";
import { useLocation, useNavigate } from "react-router-dom";

const  CheckinBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) return <p>No booking selected.</p>;

  return (
    <>
      <div className={styles.checkin}>
        <div className={styles.components}>
          <BookingDetailsTable booking={booking} />
        </div>

        <div className={styles.checkbox1}>
          <input type="checkbox" />
          <p>Want to add breakfast for ${(booking.totalPrice * 0.1).toFixed(2)}?</p>
        </div>
        <div className={styles.checkbox2}>
          <input type="checkbox" />
          <p>
            I confirm that {booking.guests.fullName} has paid the total amount of $
            {booking.totalPrice.toFixed(2)}
          </p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.checkbutton}>Check in booking #{booking.id}</button>
          <button className={styles.back} onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
};

export default CheckinBooking;
