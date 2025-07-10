import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import supabase from "../services/supabase"; // update path as needed

const COLORS = ["#e63946", "#f4a261", "#2a9d8f", "#00b4d8"];

// Helper to classify stays
const getCategory = (nights) => {
  if (nights === 2) return "2 nights";
  if (nights === 3) return "3 nights";
  if (nights >= 4 && nights <= 5) return "4–5 nights";
  if (nights >= 8 && nights <= 14) return "8–14 nights";
  return null; // skip if not in chart
};

const StayDurationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("numNights");

      if (error) {
        console.error("Error fetching bookings", error);
        return;
      }

      // Count bookings by category
      const counts = {};
      bookings.forEach((b) => {
        const category = getCategory(b.numNights);
        if (!category) return;
        counts[category] = (counts[category] || 0) + 1;
      });

      const formattedData = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
      }));

      setData(formattedData);
    }

    fetchBookings();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#18212f",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "410px",
        height: "300px",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "20px" }}>
        Stay duration summary
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              color: "#f1f5f9",
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "#f1f5f9", fontSize: "14px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StayDurationChart;
