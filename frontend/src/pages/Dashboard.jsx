import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Plus, TrendingUp, Car } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import CarCard from '../components/CarCard';
import './Dashboard.scss';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/sessions`);
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (session.car_model && session.car_model.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || session.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Overview</h1>
        <button className="icon-btn"><Plus size={24} /></button>
      </header>

      <section className="metrics-grid">
        <MetricCard 
          label="Total Today" 
          value="42" 
          subtext="+5% from yesterday" 
          icon={Car} 
          color="indigo"
        />
        <MetricCard 
          label="Revenue" 
          value="₹8,450" 
          subtext="+12% from yesterday" 
          icon={TrendingUp} 
          color="indigo"
        />
      </section>

      <div className="search-filter-section">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by plate or car model..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-chips">
          {['All', 'Parked', 'Retrieving', 'Retrieved'].map(status => (
            <button 
              key={status}
              className={`chip ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <section className="sessions-list">
        <h2>Live Parking ({filteredSessions.length})</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          filteredSessions.map(session => (
            <CarCard key={session.id} session={session} />
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
