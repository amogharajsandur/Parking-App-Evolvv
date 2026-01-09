import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSwitcher.module.scss';
import { useRole } from '../context/RoleContext';
import { User, Briefcase, Truck, ShieldCheck } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole, path) => {
    setRole(newRole);
    navigate(path);
  };

  const roles = [
    { id: 'user', label: 'User App', path: '/', icon: User },
    { id: 'manager', label: 'Manager', path: '/dashboard', icon: Briefcase },
    { id: 'driver', label: 'Driver (Valet)', path: '/valet', icon: Truck },
    { id: 'admin', label: 'Super Admin', path: '/admin', icon: ShieldCheck }
  ];

  return (
    <div className={styles.roleSwitcher}>
      <h3>Select Role View</h3>
      <div className={styles.roleList}>
        {roles.map((r) => (
          <button 
            key={r.id} 
            className={role === r.id ? styles.active : ''} 
            onClick={() => handleRoleSwitch(r.id, r.path)}
          >
            <r.icon size={16} />
            <span>{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;
