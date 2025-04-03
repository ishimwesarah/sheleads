import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";

function UserLayout()
{ const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="slf-app-container"> {/* Optional wrapper */}
        <Navbar onToggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
  
        {/* Mobile Overlay */}
        {isSidebarOpen && <div className="slf-mobile-overlay active" onClick={toggleSidebar}></div>}
  
        {/* Main Content Area */}
        <main className="slf-content-area"> {/* Use this instead of slf-dashboard-wrapper directly if Outlet is used */}
           {/* The Outlet renders the matched child route (e.g., DashboardView) */}
           <Outlet />
           {/* Or directly render: <DashboardView /> */}
        </main>
      </div>
    );
  };

export default UserLayout;