import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Car, ArrowLeft, UserPlus, Phone, MapPin, Clock, Landmark, MoreVertical, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import MetricCard from '../components/MetricCard';
import AddDriverForm from '../components/AddDriverForm';
import API_BASE_URL from '../config';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
     setRole('user');
     navigate('/');
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/sessions`);
        setSessions(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = (session.car_model || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (session.plate_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (session.customer_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || (session.status || '').toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Calculate Metrics from Data
  const occupancy = Math.round((sessions.filter(s => s.status === 'parked').length / 50) * 100) + '%';
  const retrievals = sessions.filter(s => s.status === 'retrieving').length;
  // Sum amount for simplified 'Today's Rev' - assuming all sessions are today for this demo or we'd filter by date
  const revenue = sessions.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const formattedRevenue = `₹${(revenue / 1000).toFixed(1)}k`;

  return (
    <div className={styles.dashboardContainer}>
      {showAddDriver && <AddDriverForm onClose={() => setShowAddDriver(false)} />}

      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardHeaderContent}>
          <div className={styles.topTitle}>
            <button className={styles.backBtn} onClick={handleBack}>
               <ArrowLeft size={20} />
            </button>
            <div className={styles.titleTxt}>
              <h1>Manager Dashboard</h1>
              <p>Active Valets • Phoenix Mall</p>
            </div>
          </div>
          <button className={styles.addDriverBtn} onClick={() => setShowAddDriver(true)}>
            <UserPlus size={16} />
            <span>Add Driver</span>
          </button>
        </div>
      </header>

      <div className={styles.contentScroll}>
        <section className={styles.metricsGrid}>
          <MetricCard title="Occupancy" value={occupancy} icon={Car} trend="+2%" />
          <MetricCard title="Retrievals" value={retrievals} icon={Clock} trend="Active" />
          <MetricCard title="Revenue" value={formattedRevenue} icon={Landmark} trend="+12%" />
          <MetricCard title="Issues" value="0" icon={Phone} />
        </section>

        <section className={styles.mainActionsSection}>
          <div className={styles.searchFilterRow}>
            <div className={styles.searchBox}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className={styles.filterBtn} onClick={() => alert('Advanced filters')}>
               <Filter size={18} />
            </button>
          </div>

          <div className={styles.statusFilters}>
            {['All', 'Parked', 'Retrieving', 'Returned'].map(status => (
              <button 
                key={status}
                className={`${styles.filterChip} ${filterStatus === status ? styles.active : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.sessionsList}>
          <h2>
            <Car size={18} />
            Recent Activity ({filteredSessions.length})
          </h2>
          
          <div className={styles.listContainer}>
            {loading ? (
              <p style={{padding: '20px', textAlign: 'center', color: '#64748b'}}>Loading activity...</p>
            ) : filteredSessions.length > 0 ? (
              filteredSessions.map(session => (
                <div key={session.id} className={styles.cleanSessionCard}>
                  <div className={styles.leftIcon}>
                    <Car size={20} />
                  </div>
                  <div className={styles.midContent}>
                    <div className={styles.topRow}>
                       <h3>{session.car_model}</h3>
                       <span className={`${styles.statusBadge} ${styles[session.status]}`}>
                         {session.status}
                       </span>
                    </div>
                    <p className={styles.plate}>{session.plate_number}</p>
                    <div className={styles.metaRow}>
                       <span>{session.customer_name}</span>
                       <span className={styles.dot}>•</span>
                       <span>{session.location}</span>
                    </div>
                  </div>
                  <div className={styles.rightAction}>
                     <div className={styles.time}>{new Date(session.entry_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                     <button className={styles.moreBtn}>
                        <MoreVertical size={16} />
                     </button>
                  </div>
                </div>
              ))
            ) : (
               <p style={{padding: '20px', textAlign: 'center', color: '#64748b'}}>No recent activity found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
