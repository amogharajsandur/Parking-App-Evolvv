import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { ArrowLeft, MapPin, ChevronDown, Ticket, Landmark, Database, Users, Building } from 'lucide-react';
import styles from './SuperAdmin.module.scss';

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSite, setSelectedSite] = useState('Phoenix Mall - Lower Parel');
  
  const [stats, setStats] = useState({
    todayTickets: 0,
    todayCollection: '0',
    totalTickets: 0,
    totalCollection: '0',
    activeParking: 0
  });

  const handleBack = () => {
    setRole('user');
    navigate('/');
  };

  // Stats Filtering
  useEffect(() => {
    const fetchStats = async () => {
       try {
           const res = await axios.get('http://localhost:5001/api/sessions');
           const sessions = res.data;
           
           // Filter by Site
           const siteSessions = sessions.filter(s => {
              if (!selectedSite) return true;
              // Simple check: if mock data location string contains part of selected site
              // Mapping 'Phoenix Mall - Lower Parel' -> 'Phoenix Mall'
              // Mapping 'Inorbit Mall - Malad' -> 'Inorbit'
              // This logic depends on mock data strings
              const siteKey = selectedSite.split(' - ')[0]; // "Phoenix Mall" from "Phoenix Mall - Lower Parel"
              return s.location.includes(siteKey);
           });

           // Helper for "Today"
           const isToday = (dateString) => {
               const date = new Date(dateString);
               const today = new Date();
               return date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();
           };

           const todaySessions = siteSessions.filter(s => isToday(s.entry_time));
           const todayRevenue = todaySessions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
           const totalRevenue = siteSessions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
           const activeCount = siteSessions.filter(s => ['parked', 'pending', 'retrieving'].includes(s.status)).length;

           setStats({
               todayTickets: todaySessions.length,
               todayCollection: todayRevenue.toLocaleString('en-IN'),
               totalTickets: siteSessions.length,
               totalCollection: totalRevenue.toLocaleString('en-IN'),
               activeParking: activeCount
           });

       } catch (err) {
           console.error("Failed to fetch admin stats", err);
       }
    };
    fetchStats();
  }, [selectedSite]); // Re-run when site changes

  // Fetch Pending Drivers
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [viewDriver, setViewDriver] = useState(null); // For modal

  useEffect(() => {
     if (activeTab === 'Approvals') {
        const fetchPending = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/drivers/pending');
                setPendingDrivers(res.data);
            } catch (err) {
                console.error("Failed to fetch pending drivers", err);
            }
        };
        fetchPending();
     }
  }, [activeTab]);

  const handleApprove = async (id) => {
      try {
          await axios.put(`http://localhost:5001/api/drivers/${id}/approve`);
          setPendingDrivers(prev => prev.filter(d => d.id !== id));
          setViewDriver(null);
      } catch (err) {
          console.error("Failed to approve", err);
      }
  };

  const handleReject = async (id) => {
      try {
          await axios.put(`http://localhost:5001/api/drivers/${id}/reject`);
          setPendingDrivers(prev => prev.filter(d => d.id !== id));
          setViewDriver(null);
      } catch (err) {
          console.error("Failed to reject", err);
      }
  };

  return (
    <div className={styles.adminPage}>
      {/* Driver Detail Modal */}
      {viewDriver && (
        <div className={styles.modalOverlay}>
            <div className={styles.profileModal}>
                <header className={styles.modalWithHeader}>
                    <button className={styles.backIcon} onClick={() => setViewDriver(null)}>
                        <ArrowLeft size={24} color="white" />
                    </button>
                    <h3>Driver Profile</h3>
                </header>
                <div className={styles.modalBody}>
                    <div className={styles.avatarSection}>
                       <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" />
                    </div>
                    
                    <div className={styles.detailSection}>
                        <h4>Personal Details</h4>
                        <div className={styles.row}>
                            <label>Name:</label>
                            <span>{viewDriver.name}</span>
                        </div>
                        <div className={styles.row}>
                            <label>Phone:</label>
                            <span>{viewDriver.phone}</span>
                        </div>
                         {viewDriver.details && (
                            <>
                                <div className={styles.row}>
                                    <label>Email:</label>
                                    <span>{viewDriver.details.email || 'N/A'}</span>
                                </div>
                                <div className={styles.row}>
                                    <label>Address:</label>
                                    <span>{viewDriver.details.address || 'N/A'}</span>
                                </div>
                                <div className={styles.row}>
                                    <label>DOB:</label>
                                    <span>{viewDriver.details.dob || 'N/A'}</span>
                                </div>
                            </>
                         )}
                    </div>

                    <div className={styles.detailSection}>
                        <h4>License Details</h4>
                        <div className={styles.row}>
                            <label>License No:</label>
                            <span>{viewDriver.license}</span>
                        </div>
                         {viewDriver.details && (
                             <div className={styles.row}>
                                <label>Expiry:</label>
                                <span>{viewDriver.details.expiry || 'N/A'}</span>
                             </div>
                         )}
                        <div className={styles.licenseImg}>
                            {/* Placeholder for License Image */}
                             <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2680&auto=format&fit=crop" alt="License" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      <header className={styles.adminHeader}>
        <div className={styles.adminHeaderContent}>
          <div className={styles.headerTop}>
            <button className={styles.backBtn} onClick={handleBack}>
               <ArrowLeft size={20} />
            </button>
            <div className={styles.titleTxt}>
              <h1>Super Admin</h1>
              <p>System overview and approvals</p>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.contentScroll}>
        <div className={styles.tabSwitcher}>
          <button 
            className={activeTab === 'Overview' ? styles.active : ''} 
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'Approvals' ? styles.active : ''} 
            onClick={() => setActiveTab('Approvals')}
          >
            Approvals
             {pendingDrivers.length > 0 && <span className={styles.badge}>{pendingDrivers.length}</span>}
          </button>
          <button 
            className={activeTab === 'Sites' ? styles.active : ''} 
            onClick={() => setActiveTab('Sites')}
          >
            Manage Sites
          </button>
        </div>

        {activeTab === 'Overview' && (
          <>
            <section className={styles.siteSelector}>
              <p>Select Site</p>
              <div className={styles.selectBox}>
                <MapPin size={18} color="var(--role-primary)" />
                <select 
                    value={selectedSite} 
                    onChange={(e) => setSelectedSite(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', background: 'transparent' }}
                >
                    <option value="Phoenix Mall - Lower Parel">Phoenix Mall - Lower Parel</option>
                    <option value="City Center Mall">City Center Mall</option>
                    <option value="Inorbit Mall - Malad">Inorbit Mall - Malad</option>
                </select>
                <ChevronDown size={18} color="#94A3B8" />
              </div>
            </section>

            <section className={styles.statsSection}>
              <div className={styles.sectionTitle}>
                <Landmark size={18} />
                <h3>Today's Performance</h3>
              </div>
              
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.cardHeader}>
                        <label>Tickets Issued</label>
                        <div className={styles.iconOpac}>
                            <Ticket size={16} />
                        </div>
                    </div>
                    <h2>{stats.todayTickets}</h2>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardHeader}>
                        <label>Collection</label>
                        <div className={styles.iconOpac}>
                            <Landmark size={16} />
                        </div>
                    </div>
                    <h2 className={styles.price}>₹{stats.todayCollection}</h2>
                </div>
              </div>
            </section>

            <section className={styles.overallStats}>
              <div className={styles.sectionTitle}>
                <Database size={18} />
                <h3>Overall Statistics</h3>
              </div>
              
              <div className={styles.statsList}>
                <div className={styles.statRow}>
                    <div className={`${styles.iconBox} ${styles.purple}`}>
                      <Ticket size={18} />
                    </div>
                    <span className={styles.label}>Total Tickets</span>
                    <p className={styles.val}>{stats.totalTickets}</p>
                </div>
                <div className={styles.statRow}>
                    <div className={`${styles.iconBox} ${styles.green}`}>
                      <Landmark size={18} />
                    </div>
                    <span className={styles.label}>Total Collection</span>
                    <p className={styles.val}>₹{stats.totalCollection}</p>
                </div>
                <div className={styles.statRow}>
                    <div className={`${styles.iconBox} ${styles.blue}`}>
                      <MapPin size={18} />
                    </div>
                    <span className={styles.label}>Active Parking</span>
                    <p className={styles.val}>{stats.activeParking}</p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'Approvals' && (
          <section className={styles.approvalsSection}>
             <h3 style={{fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#334155'}}>Pending Driver Approvals</h3>
             
             {pendingDrivers.map(driver => (
                 <div key={driver.id} className={styles.approvalCard}>
                    <div className={styles.cardTop}>
                        <div className={styles.avatar}>
                           <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="driver" />
                        </div>
                        <div className={styles.info}>
                            <h4>{driver.name}</h4>
                            <div className={styles.metaRow}>
                                {/* Placeholder icon if needed */}
                                <span>{driver.phone}</span>
                            </div>
                             <div className={styles.metaRow}>
                                <span>License: {driver.license}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.submitInfo}>
                        <div className={styles.row}>
                            <span>Submitted by:</span>
                            <b>{driver.submittedBy}</b>
                        </div>
                         <div className={styles.row}>
                            <span>Submitted on:</span>
                            <b>{driver.submittedOn}</b>
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.viewBtn} onClick={() => setViewDriver(driver)}>
                            <Users size={16} />
                            View Details
                        </button>
                        <button className={styles.approveBtn} onClick={() => handleApprove(driver.id)}>
                             <div className={styles.iconCircle}><Users size={12} /></div>
                             Approve
                        </button>
                        <button className={styles.rejectBtn} onClick={() => handleReject(driver.id)}>
                             Reject
                        </button>
                    </div>
                 </div>
             ))}

             {pendingDrivers.length === 0 && (
                 <p style={{textAlign: 'center', padding: '20px', color: '#94a3b8'}}>No pending approvals</p>
             )}
          </section>
        )}

        {activeTab === 'Sites' && (
          <section className={styles.sitesSection}>
             <div className={styles.siteCard}>
                <div className={styles.iconBox}>
                   <Building size={20} />
                </div>
                <div className={styles.text}>
                   <h4>Phoenix Mall</h4>
                   <p>Lower Parel, Mumbai</p>
                </div>
                <button className={styles.manageBtn}>Edit</button>
             </div>
             
             <div className={styles.siteCard}>
                <div className={styles.iconBox}>
                   <Building size={20} />
                </div>
                <div className={styles.text}>
                   <h4>City Center Mall</h4>
                   <p>Bandra West, Mumbai</p>
                </div>
                <button className={styles.manageBtn}>Edit</button>
             </div>

             <div className={styles.siteCard}>
                <div className={styles.iconBox}>
                   <Building size={20} />
                </div>
                <div className={styles.text}>
                   <h4>Orion Business Park</h4>
                   <p>Malad, Mumbai</p>
                </div>
                <button className={styles.manageBtn}>Edit</button>
             </div>
             <button className={styles.addBtn}>+ Add New Site</button>
          </section>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
