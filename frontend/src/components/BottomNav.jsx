import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Ticket, History, Settings, LayoutDashboard, Truck } from 'lucide-react';
import './BottomNav.scss';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20} />
        <span>Manager</span>
      </NavLink>
      <NavLink to="/valet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Truck size={20} />
        <span>Valet</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <History size={20} />
        <span>History</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
