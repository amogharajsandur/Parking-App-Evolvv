import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Ticket, Clock, Settings } from 'lucide-react';
import styles from './BottomNav.module.scss';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'ticket', icon: Ticket, label: 'Ticket', path: '/ticket' },
    { id: 'history', icon: Clock, label: 'History', path: '/history' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={24} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;