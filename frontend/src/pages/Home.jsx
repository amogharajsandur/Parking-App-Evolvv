import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, MapPin, Clock, ChevronRight, Car } from 'lucide-react';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <header className={styles.homeHeader}>
        <div className={styles.topBar}>
          <div className={styles.welcome}>
            <h2>Smart Parking</h2>
            <p>Welcome back!</p>
          </div>
        </div>
        
        <div className={styles.heroBanner}>
          <div className={styles.bannerContent}>
            <span className={styles.badgePremium}>Premium</span>
            <h1>Inorbit Mall</h1>
            <p>Malad West, Mumbai</p>
          </div>
          <div className={styles.bannerAction}>
            <Car size={32} color="#ffffff" />
          </div>
        </div>
      </header>
      
      <div className={styles.contentScroll}>
        <section className={styles.mainActions}>
          <div className={styles.scanParkCard} onClick={() => navigate('/scan')}>
            <div className={styles.qrIconBg}>
              <QrCode size={32} />
            </div>
            <div className={styles.textInfo}>
              <h3>Scan to Park</h3>
              <p>Scan QR code at entry point</p>
            </div>
            <ChevronRight size={24} className={styles.chevron} />
          </div>
        </section>

        <section className={styles.recentSection}>
          <div className={styles.sectionTitle}>
            <h3>Recent Parking</h3>
          </div>
          
          <div className={styles.historyCards}>
           {/* Mock Data for Home Example - Ideally fetched */}
           {[
             { id: 1, car: 'Honda City', plate: 'MH02AB1234', loc: 'Phoenix Mall', status: 'completed', time: '4h 15m', cost: '₹180' },
             { id: 2, car: 'Hyundai Creta', plate: 'MH04XY3456', loc: 'Central Plaza', status: 'completed', time: '2h 50m', cost: '₹120' },
             { id: 3, car: 'Maruti Swift', plate: 'MH43MN1122', loc: 'City Center Mall', status: 'completed', time: '1h 30m', cost: '₹200' },
           ].map(item => (
             <div key={item.id} className={styles.parkingItem}>
                <div className={styles.iconBox}>
                   <Car size={20} />
                </div>
                <div className={styles.centerInfo}>
                   <div className={styles.top}>
                      <h4>{item.loc}</h4>
                      <span className={styles.cost}>{item.cost}</span>
                   </div>
                   <div className={styles.sub}>
                     <MapPin size={12} />
                     <span>{item.loc}, Mumbai</span>
                   </div>
                </div>
                <div className={styles.rightInfo}>
                   <span className={styles.statusBadge}>Completed</span>
                   <span className={styles.date}>8 Dec 2025</span>
                </div>
             </div>
           ))}
        </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
