import React from "react";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <section className={styles.section}>
      <div className={styles.dashboard}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
          <div className={styles.filter}>
            <button disabled className={styles.primary}>
              Last 7 days
            </button>
            <button>Last 30 days</button>
            <button>Last 90 days</button>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.booking}>
            <div className={styles.bookingSvg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                color="white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-briefcase-business-icon lucide-briefcase-business"
              >
                <path d="M12 12h.01" />
                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
            </div>

            <div className={styles.content}>
              <p>BOOKINGS</p>
              <h2>840</h2>
            </div>
          </div>

          <div className={styles.sales}>
            <div className={styles.saleSvg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                color="white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-banknote-icon lucide-banknote"
              >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
            </div>
            <div className={styles.saleContent}>
              <p>SALES</p>
              <h2>$1,055,860.00</h2>
            </div>
          </div>

          <div className={styles.check}>
            <div className={styles.checkSvg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                color="white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar-days-icon lucide-calendar-days"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            </div>
            <div className={styles.checkContent}>
              <p>CHECK INS</p>
              <h2>6</h2>
            </div>
          </div>

          <div className={styles.occupancy}>
            <div className={styles.occupancySvg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                color="white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chart-no-axes-column-increasing-icon lucide-chart-no-axes-column-increasing"
              >
                <line x1="12" x2="12" y1="20" y2="10" />
                <line x1="18" x2="18" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="16" />
              </svg>
            </div>
            <div className={styles.occupancyContent}>
              <p>OCCUPANCY RATE</p>
              <h2>48%</h2>
            </div>
          </div>
        </div>
        <DashboardLayout/>
      </div>
    </section>
  );
};

export default Dashboard;
