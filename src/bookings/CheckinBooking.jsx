import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "./CheckinBooking.module.css";
import BookingDetailsTable from "./BookingDetailsTable";
import { checkInBooking } from "../services/apiBoookings";   // same service you already use

export default function CheckinBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;
  if (!booking) return <p>No booking selected.</p>;

  // 🔸 Tiny bits of local state
  const [addBreakfast, setAddBreakfast]   = useState(false);
  const [paidConfirmed, setPaidConfirmed] = useState(false);
  const [isCheckingIn, setIsCheckingIn]   = useState(false);

  async function handleCheckIn() {
    if (!paidConfirmed) {
      toast.error("Please confirm payment first.");
      return;
    }

    try {
      setIsCheckingIn(true);
      // ⬇️ call backend, include breakfast flag
      await checkInBooking(booking.id, addBreakfast);
      toast.success(`Booking #${booking.id} checked in`);
      navigate("/bookings");          // your list page will refetch & show it as CHECKED-IN
    } catch (err) {
      toast.error("Check-in failed: " + err.message);
    } finally {
      setIsCheckingIn(false);
    }
  }

  return (
    <div className={styles.checkin}>
      <div className={styles.components}>
        <BookingDetailsTable booking={booking} />
      </div>

      {/* Want breakfast? */}
      <label className={styles.checkbox1}>
        <input
          type="checkbox"
          checked={addBreakfast}
          onChange={(e) => setAddBreakfast(e.target.checked)}
        />
        <span>
          Add breakfast for ${(booking.totalPrice * 0.1).toFixed(2)}?
        </span>
      </label>

      {/* Confirm paid */}
      <label className={styles.checkbox2}>
        <input
          type="checkbox"
          checked={paidConfirmed}
          onChange={(e) => setPaidConfirmed(e.target.checked)}
        />
        <span>
          I confirm {booking.guests.fullName} paid $
          {booking.totalPrice.toFixed(2)}
        </span>
      </label>

      {/* Buttons */}
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.checkbutton}
          onClick={handleCheckIn}
          disabled={isCheckingIn || !paidConfirmed}
        >
          {isCheckingIn ? "Checking in…" : `Check in booking #${booking.id}`}
        </button>
        <button className={styles.back} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
