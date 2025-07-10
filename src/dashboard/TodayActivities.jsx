import React from "react";

const todayGuests = [
  {
    id: 1,
    status: "DEPARTING",
    name: "Jonas Schmedtmann",
    nights: 5,
    countryCode: "pt",
    action: "CHECK OUT",
  },
  {
    id: 2,
    status: "ARRIVING",
    name: "David Smith",
    nights: 11,
    countryCode: "au",
    action: "CHECK IN",
  },
  {
    id: 3,
    status: "DEPARTING",
    name: "Maria Rodriguez",
    nights: 2,
    countryCode: "es",
    action: "CHECK OUT",
  },
];

const statusColors = {
  ARRIVING: "#22c55e", // green
  DEPARTING: "#3b82f6", // blue
};

const TodayActivities = () => {
  return (
    <div
      style={{
        backgroundColor: "#18212f",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "20px" }}>Today</h3>
      <div>
        {todayGuests.map((guest) => (
          <div
            key={guest.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#18212f",
              padding: "10px 15px",
              marginBottom: "10px",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          >
            {/* Status Pill */}
            <span
              style={{
                backgroundColor: statusColors[guest.status],
                color: "white",
                padding: "3px 8px",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
                minWidth: "70px",
                textAlign: "center",
              }}
            >
              {guest.status}
            </span>

            {/* Guest Name */}
            <div style={{ flex: 1, marginLeft: "15px", fontWeight: 600 }}>
              {guest.name}
            </div>

            {/* Nights Column */}
            <div
              style={{
                minWidth: "70px",
                textAlign: "right",
                fontSize: "13px",
                opacity: 0.85,
              }}
            >
              {guest.nights} nights
            </div>

            {/* Action Button */}
            <button
              style={{
                backgroundColor: "#6366f1",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              {guest.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayActivities;
