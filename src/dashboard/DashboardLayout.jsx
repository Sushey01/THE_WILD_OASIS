import { useRecentBookings } from "./useRecentBookings";
import SalesChart from "./SalesChart";

function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();

  // Show basic loading message
  if (isLoading) return <div style={{color:"#E5E7EB"}}>Loading sales data...</div>;

  return (
    <div >
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
