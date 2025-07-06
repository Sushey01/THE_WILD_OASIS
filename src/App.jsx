import React from "react";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./bookings/Bookings";
import Cabin from "./pages/Cabin";
import Settings from "./pages/Settings";
import LoginForm from "./pages/LoginForm";
import BookingDetails from "./bookings/BookingDetails"; // Details component
import CabinTable from "./pages/CabinTable"; 
import CheckinBooking from "./bookings/CheckinBooking"; 
import BookingDetailsTable from "./bookings/BookingDetailsTable"; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 10 * 1000, // 10 minutes in milliseconds
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="app-layout" style={{ display: "flex" }}>
          <Navbar />
          <div className="main-content" style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Bookings />} />
              <Route path="/cabins" element={<Cabin />} />
              <Route path="/users" element={<LoginForm />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Dynamic param for booking details */}
              <Route path="/seedetails/:id" element={<BookingDetailsTable />} />
              
              <Route path="/cabinform" element={<CabinTable />} />
              <Route path="/checkin" element={<CheckinBooking />} />
              
              {/* Fallback */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>

        <ReactQueryDevtools initialIsOpen={false} />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "grey",
              color: "white",
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
