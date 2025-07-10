import { useRecentBookings } from "./useRecentBookings";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivities from "./TodayActivities";

function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();

  // Show basic loading message
  if (isLoading) return <div style={{color:"#E5E7EB"}}>Loading sales data...</div>;

  return (
    <div className="Layout" style={{display:"flex", flexDirection:"column", gap:"20px"}}>
      <div className="charts" style={{display:"grid", gridTemplateColumns:"1.5fr 1fr"}}>
      <TodayActivities/>
      <DurationChart/>
      </div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
