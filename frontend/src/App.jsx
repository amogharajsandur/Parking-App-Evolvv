import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/user/Home';
import Dashboard from './pages/manager/Dashboard';
import ValetView from './pages/driver/ValetView';
import History from './pages/user/History';
import SuperAdmin from './pages/admin/SuperAdmin';
import Ticket from './pages/user/Ticket';
import ScanQR from './pages/manager/ScanQR';
import ConfirmParking from './pages/user/ConfirmParking';
import ManageVehicles from './pages/user/ManageVehicles';
import FAQ from './pages/common/FAQ';
import Settings from './pages/common/Settings';
import BottomNav from './components/BottomNav';
import RoleSwitcher from './components/RoleSwitcher';
import { RoleProvider, useRole } from './context/RoleContext';
import './styles/global.scss';

const AppContent = () => {
  const { role } = useRole();

  // Helper to check if user role is 'user'
  const isUser = role === 'user';

  // Apply role class to body
  React.useEffect(() => {
    document.body.className = `role-${role}`;
  }, [role]);

  return (
    <div className="emulator-layout">
      <div className="app-container">
        <main className="main-content">
          <Routes>
            {/* User Only Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/scan" element={<ScanQR />} />
            <Route path="/confirm-parking" element={<ConfirmParking />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/manage-vehicles" element={<ManageVehicles />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Role Specific Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/valet" element={<ValetView />} />
            <Route path="/admin" element={<SuperAdmin />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        {isUser && (
          <div className="bottom-fixed-layer">
            <BottomNav />
          </div>
        )}
      </div>

      <div className="sidebar-emulator">
        <RoleSwitcher />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <RoleProvider>
        <AppContent />
      </RoleProvider>
    </Router>
  );
}

export default App;