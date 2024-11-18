import React from "react";
import { Link } from "react-router-dom";
import { Home, Dashboard } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import "./SideBar.css";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const handleSwitchChange = () => {
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo">
        <img
          src="https://www.signa.com.co/wp-content/uploads/2023/02/5e3d8107454613a49e48605d_SIGNA_Logo.png"
          alt="SIGNA Logo"
          className="sidebar-logo"
        />
      </div>
      <div className="toggle-container">
        <Switch
          checked={!isCollapsed}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "sidebar toggle" }}
        />
      </div>
      <ul>
        <li
          style={{
            textAlign: isCollapsed ? "center" : "start",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          <Link to="/dashboard">
            <Home />
            {!isCollapsed && "Dashboard"}{" "}
          </Link>
        </li>
        <li
          style={{
            textAlign: isCollapsed ? "center" : "start",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          <Link to="/brand">
            <Dashboard />
            {!isCollapsed && "Registro de marca"}{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
