import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  BookingIcon,
  SalesIcon,
  CheckInIcon,
  OccupancyIcon,
} from "../dashboard/DashboardIcon";
import { getBookingsAfterDate } from "../services/apiBoookings";

const getDaysAgoDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const Dashboard = () => {
  const [filter, setFilter] = useState("7");
  const [stats, setStats] = useState({
    bookings: 0,
    sales: 0,
    checkIns: 0,
    occupancy: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const days = parseInt(filter, 10);
        const fromDate = getDaysAgoDate(days);

        const bookings = await getBookingsAfterDate(fromDate);

        const totalBookings = bookings.length;
        const totalSales = bookings.reduce(
          (sum, b) => sum + (b.totalPrice || 0) + (b.extrasPrice || 0),
          0
        );
        const checkIns = bookings.filter(
          (b) => b.status === "checked-in"
        ).length;
        const totalNights = bookings.reduce(
          (sum, b) => sum + (b.numNights || 0),
          0
        );
        const totalAvailableNights = days * 10; // Assuming 10 cabins
        const occupancy = Math.round(
          (totalNights / totalAvailableNights) * 100
        );

        setStats({
          bookings: totalBookings,
          sales: totalSales,
          checkIns,
          occupancy: Math.min(occupancy, 100),
        });
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filter]);

  return (
    <section className={styles.section}>
      <div className={styles.dashboard}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
          <div className={styles.filter}>
            {["7", "30", "90"].map((days) => (
              <button
                key={days}
                onClick={() => setFilter(days)}
                className={filter === days ? styles.primary : ""}
                disabled={filter === days}
              >
                Last {days} days
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className={styles.stats}>
            <div className={styles.booking}>
              <div className={styles.bookingSvg}>
                <BookingIcon />
              </div>
              <div className={styles.content}>
                <p>BOOKINGS</p>
                <h2>{stats.bookings}</h2>
              </div>
            </div>

            <div className={styles.sales}>
              <div className={styles.saleSvg}>
                <SalesIcon />
              </div>
              <div className={styles.saleContent}>
                <p>SALES</p>
                <h2>${stats.sales.toLocaleString()}</h2>
              </div>
            </div>

            <div className={styles.check}>
              <div className={styles.checkSvg}>
                <CheckInIcon />
              </div>
              <div className={styles.checkContent}>
                <p>CHECK INS</p>
                <h2>{stats.checkIns}</h2>
              </div>
            </div>

            <div className={styles.occupancy}>
              <div className={styles.occupancySvg}>
                <OccupancyIcon />
              </div>
              <div className={styles.occupancyContent}>
                <p>OCCUPANCY RATE</p>
                <h2>{stats.occupancy}%</h2>
              </div>
            </div>
          </div>
        )}

        <DashboardLayout />
      </div>
    </section>
  );
};

export default Dashboard;
