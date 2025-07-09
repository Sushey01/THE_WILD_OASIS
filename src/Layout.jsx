import { Outlet, Link } from "react-router-dom";
import Navbar from "../src/pages/Navbar";
import logo from "../src/assets/images/logo-dark.png"
import userLogo from "../src/assets/images/mainuser.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeading from "../src/pages/MainHeading"
import DarkModeToggle from "./dashboard/DarkModeToggle";
import { useDarkMode } from "./context/DarkModeContext";


export default function Layout() {

  const navigate=useNavigate()
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  return (
    <div style={{ position: "relative" }}>

     

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: "20%", backgroundColor: "#18212f" }}>
          
          <div className="left-section">
            {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "140px", height: "auto", backgroundColor: "#18212f" }}
              />
            </div> */}

              
              <Navbar/>

            <div className="nav-list">
              <ul>
                {/* <SidebarLink to="/" label="Home" icon="house" />
                <SidebarLink to="/bookings" label="Bookings" icon="calendar-days" />
                <SidebarLink to="/cabins" label="Cabins" icon="castle" />
                <SidebarLink to="/users" label="Users" icon="users" />
                <SidebarLink to="/settings" label="Settings" icon="users" /> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
      <div style={{ width: "80%" }}>
          <div className="right-section">
            {/* User Topbar */}
            <div className="user-section" style={{ width:"80%",display: "flex", alignItems: "center", padding: "10px", paddingRight:"40px", backgroundColor: "#1f2937" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={userLogo}
                  alt="User"
                  style={{ objectFit: "cover", width: "40px", height: "40px", borderRadius: "50%", padding: "5px" }}
                />
                <p style={{ color: "white", marginLeft: "5px", fontSize:"14px", fontFamily:"Poppins, sans-serif" }}>User</p>
              </div>

              <div
            className="userButtons"
            style={{
              height: "50px",
            }}
          >
            <button style={{color:"#4f46e5", background:"transparent", border:"none"}}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-icon lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            </button>
            
            <button style={{color:"#4f46e5", background:"transparent", border:"none"}}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun-icon lucide-sun"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            {/* <DarkModeToggle /> */}
            </button>
            
            <button onClick={()=>navigate("/login")} style={{color:"#4f46e5", background:"transparent", border:"none"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out-icon lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            </button>
          </div>
            </div>
            

            {/* Outlet for route content */}
            <div style={{ background: "#111827", overflowY: "scroll", height: "100vh" }}>
              <Outlet />
            </div>
          </div>  
        </div>
      </div>

      {/* Optional Delete Booking Modal */}
      {showDeleteBtn && <DeleteBooking />}
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ to, label, icon }) {
  const icons = {
    house: (
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    ),
    "calendar-days": (
      <>
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
      </>
    ),
    castle: (
      <>
        <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
        <path d="M18 11V4H6v7" />
        <path d="M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    settings: (
      <>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18..." />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    eye: <circle cx="12" cy="12" r="3" />,
    "plus-square": <rect x="9" y="9" width="6" height="6" />,
    edit: <path d="M12 20h9" />,
    "trash-2": (
      <>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </>
    ),
  };

  return (
    <li>
      <Link className="navlink" to={to} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", color: "#4f46e5" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
        {label}
      </Link>
    </li>
  );
}

// User Topbar Icons
function UserIcon({ type }) {
  const paths = {
    user: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </>
    ),
    "log-out": (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </>
    ),
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
}