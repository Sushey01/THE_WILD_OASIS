import React, { useState } from "react";
import styles from "./CheckinBooking.module.css";
import BookingDetailsTable from "./BookingDetailsTable";
import { useLocation, useNavigate } from "react-router-dom";
import { checkInBooking } from "../services/apiBoookings";





const  CheckinBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const [isCheckingIn, setIsCheckingIn] = useState(false)
  if (!booking) return <p>No booking selected.</p>;

async function handleCheckIn() {
    try {
      setIsCheckingIn(true);
      await checkInBooking(booking.id);  // 👈 call service
      toast.success(`Booking #${booking.id} checked in`);
      navigate("/bookings");             // ✅ go back or to a list page
    } catch (err) {
      toast.error("Check-in failed: " + err.message);
    } finally {
      setIsCheckingIn(false);
    }
  }


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
          <button className={styles.checkbutton} type="button" onClick={handleCheckIn} disabled={isCheckingIn}>{isCheckingIn? "Checking in...":`Check in booking #${booking.id}`}</button>
          <button className={styles.back} onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
};

export default CheckinBooking;
