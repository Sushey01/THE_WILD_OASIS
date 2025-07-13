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
import BookingDetails from "./bookings/BookingDetails";
import CabinTable from "./pages/CabinTable";
import CheckinBooking from "./bookings/CheckinBooking";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/LoginForm"


// Import your DarkModeProvider
import { DarkModeProvider } from "./context/DarkModeContext";
import UserForm from "./pages/UserForm";
import LoginForm from "./pages/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 10 * 1000,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* Wrap everything inside DarkModeProvider */}
        <AuthProvider>

        <DarkModeProvider>
          <div className="main-content" style={{ flex: 1 }}>
           <Routes>
  <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="bookings/:bookingId" element={<Bookings />} />
    <Route path="cabins" element={<Cabin />} />
    <Route path="user" element={<UserForm />} />
    <Route path="settings" element={<Settings />} />
    <Route path="seedetails/:id" element={<BookingDetails />} />
    <Route path="checkin" element={<CheckinBooking />} />
  </Route>

  <Route path="/login" element={<LoginForm />} />
  <Route path="/cabinform" element={<CabinTable />} />
  <Route path="*" element={<Dashboard />} />
</Routes>

          </div>
        </DarkModeProvider>
        </AuthProvider>

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
