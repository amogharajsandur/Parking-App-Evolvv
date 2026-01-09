import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ValetView from './pages/ValetView';
import History from './pages/History';
import BottomNav from './components/BottomNav';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/valet" element={<ValetView />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
