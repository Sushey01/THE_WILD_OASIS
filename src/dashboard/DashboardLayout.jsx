import { useRecentBookings } from "./useRecentBookings";
import SalesChart from "./SalesChart";

function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();

  // Show basic loading message
  if (isLoading) return <div>Loading sales data...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
