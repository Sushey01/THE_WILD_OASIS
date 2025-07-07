import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./BookingDetails.module.css";
import BookingDetailsTable from './BookingDetailsTable';
import useBooking from './useBooking';

const BookingDetails = () => {
  const { id } = useParams(); // get booking id from url
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useBooking(id); // pass id to hook

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading booking</h1>;
  if (!booking) return <h1>Booking not found</h1>;

  return (
    <div className={styles.details}>
      <div className={styles.head}>
        <h1 className={styles.title}>
          Booking #{booking.id}
          <button>{booking.status?.toUpperCase() || "UNCONFIRMED"}</button>
        </h1>
        
         <div className={styles.back}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      </div>

     

      <BookingDetailsTable booking={booking} />

      <div className={styles.footer}>
        <button
          className={styles.button1}
          onClick={() => navigate("/checkin", { state: { booking } })}
        >
          Check in
        </button>
        <button className={styles.button2}>Delete booking</button>
        <button className={styles.button3} onClick={() => navigate("/bookings")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
