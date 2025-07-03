import React from "react";
import "./App.css";
import CabinTable from "./pages/CabinTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Cabin from "./pages/Cabin";
import HeroSection from "./pages/HeroSection";
import Settings from "./pages/Settings";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import BookingDetails from "./bookings/BookingTable";
import BookingTable from "./bookings/BookingTable";
import Bookings from "./bookings/Bookings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 10,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <CabinTable />
      <Cabin/>
      <Settings/> 
      <LoginForm/>
      <Dashboard/> */}
      <BookingTable/>
      <Bookings/>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "grey",
            color: "white", // fixed invalid `grey` color reference
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
