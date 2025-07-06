import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BookingDetailsTable.module.css";
import BookingDetailsRow from "./BookingDetailsRow";

const BookingDetailsTable = ({ booking: propBooking }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Use booking from prop if passed, else from location state
  const booking = propBooking || state?.booking;

  if (!booking) {
    return (
      <div className={styles.mainContainer}>
        <p>No booking selected. Please go back and choose a booking.</p>
        <button className={styles.button3} onClick={() => navigate("/bookings")}>
          Back
        </button>
      </div>
    );
  }

  const {
    guests,
    observations,
    hasBreakfast,
    totalPrice,
    isPaid,
    created_at,
  } = booking;

  return (
    <div className={styles.mainContainer}>
      <BookingDetailsRow booking={booking} />
      <div className={styles.container}>
        {/* your UI */}
        <div className={styles.rowContainer}>
          {/* Guest Info */}
          <div className={styles.guestHeader}>
            <p className={styles.guestName}>
              {guests.fullName} + {guests.numGuests - 1} guests
            </p>
            <p className={styles.email}>• {guests.email}</p>
            <p className={styles.nationalId}>• National ID {guests.nationalID}</p>
          </div>
          {/* Observations */}
          <div className={styles.observation}>
            <p className={styles.label}>Observations</p>
            <p className={styles.value}>{observations || "None"}</p>
          </div>
          {/* Booking Extras */}
          <div className={styles.extraDetail}>
            <p className={styles.label}>Breakfast included?</p>
            <p className={styles.value}>{hasBreakfast ? "Yes" : "No"}</p>
          </div>
          {/* Pricing Info */}
          <div className={styles.priceDetail}>
            <div className={styles.price1}>
              <p className={styles.label}>Total price</p>
              <p className={styles.price}>
                ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <p className={styles.payment}>
              {isPaid ? "Paid" : "Will pay at property"}
            </p>
          </div>
          {/* Booking Time */}
          <div className={styles.bookedTime}>
            <p>Booked {new Date(created_at).toLocaleString()}</p>
          </div>
        </div>
        {/* Footer Buttons */}
        {!propBooking && (
          <div className={styles.footer}>
            <button className={styles.button1} onClick={() => navigate("/checkin", { state: { booking } })}>
              Check in
            </button>
            <button className={styles.button2}>Delete booking</button>
            <button className={styles.button3} onClick={() => navigate("/bookings")}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsTable;
