import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Car, 
  CheckCircle, 
  QrCode, 
  CreditCard
} from 'lucide-react';
import styles from './Ticket.module.scss';

const Ticket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle, location: parkLoc, amount } = location.state || {
    vehicle: { name: 'Toyota Camry', plate: 'MH 12 AB 1234' },
    location: 'Inorbit Mall',
    amount: 150
  };

  const [view, setView] = useState('ticket');

  const handleRequestRetrieval = () => {
    setView('retrieval');
  };

  const ticketContent = (
    <div className={styles.ticketContainer}>
      <div className={styles.statusBadge}>
        <div className={styles.dot}></div>
        <span>Parking Active</span>
      </div>

      <div className={styles.ticketCard}>
        <div className={`${styles.cutout} ${styles.left}`}></div>
        <div className={`${styles.cutout} ${styles.right}`}></div>
        
        <div className={styles.ticketInner}>
          <div className={styles.ticketTop}>
            <p className={styles.systemName}>Evolvv Smart Parking</p>
            <h3>Digital Parking Ticket</h3>
            <span className={styles.locBadge}>{parkLoc}</span>
          </div>

          <div className={styles.qrWrapper}>
            <QrCode size={160} strokeWidth={1.5} />
          </div>

          <div className={styles.ticketDetails}>
            <div className={styles.detailItem}>
              <div className={styles.itemIcon}><Car size={20} /></div>
              <div className={styles.txt}>
                <label>Vehicle</label>
                <p>{vehicle.name} <span>({vehicle.plate})</span></p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.itemIcon}><Clock size={20} /></div>
              <div className={styles.txt}>
                <label>Entry Time</label>
                <p>9 Jan, 11:04 am</p>
              </div>
            </div>

            <div className={`${styles.detailItem} ${styles.amountItem}`}>
              <div className={styles.itemIcon}><CreditCard size={20} /></div>
              <div className={styles.txt}>
                <label>Current Amount</label>
                <p className={styles.amt}>₹{amount}</p>
              </div>
            </div>
          </div>

          <div className={styles.ticketFooter}>
            <p>Scan this QR at the exit gate or with a valet</p>
          </div>
        </div>
      </div>

      <div className={styles.footerAction}>
        <button className={styles.retrieveBtn} onClick={handleRequestRetrieval}>
          Request Vehicle Retrieval
        </button>
      </div>
    </div>
  );

  const retrievalContent = (
    <div className={styles.retrievalContainer}>
      <div className={styles.retrievalCard}>
        <div className={styles.statusHero}>
          <Clock size={40} />
          <div>
            <h3>Retrieving Vehicle...</h3>
            <p>Our driver is on the way to your car</p>
          </div>
        </div>
        <div className={styles.etaBadge}>
          <span>Estimated Wait Time:</span>
          <strong>8 - 12 mins</strong>
        </div>
      </div>

      <section className={styles.progressSection}>
        <h3>Live Tracking</h3>
        <div className={styles.timeline}>
          <div className={`${styles.timelineItem} ${styles.done}`}>
            <CheckCircle className={styles.trackIcon} size={24} />
            <div className={styles.trackInfo}>
              <h4>Request Received</h4>
              <p>12:45 PM • Successfully initiated</p>
            </div>
          </div>
          <div className={`${styles.timelineItem} ${styles.active}`}>
            <Clock className={styles.trackIcon} size={24} />
            <div className={styles.trackInfo}>
              <h4>Valet Assigned</h4>
              <p>12:47 PM • Rajesh Kumar is heading to Level 2</p>
            </div>
          </div>
          <div className={`${styles.timelineItem} ${styles.pending}`}>
            <Car className={styles.trackIcon} size={24} />
            <div className={styles.trackInfo}>
              <h4>Vehicle in Transit</h4>
              <p>Waiting to reach the pick-up point</p>
            </div>
          </div>
          <div className={`${styles.timelineItem} ${styles.pending}`}>
            <CheckCircle className={styles.trackIcon} size={24} />
            <div className={styles.trackInfo}>
              <h4>Ready for Pickup</h4>
              <p>Will be available at the main entrance</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailsCard}>
        <h3>Vehicle Details</h3>
        <div className={styles.vehicleBrief}>
          <div className={styles.vIconBg}><Car size={24} /></div>
          <div>
            <p className={styles.vName}>{vehicle.name}</p>
            <p className={styles.vPlate}>{vehicle.plate}</p>
          </div>
        </div>
      </section>

      <div className={styles.footerAction}>
        <button className={styles.confirmBtn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.ticketPage}>
      <header className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>{view === 'ticket' ? 'My Ticket' : 'Retrieval Progress'}</h2>
      </header>

      <div className={styles.contentScroll}>
        {view === 'ticket' ? ticketContent : retrievalContent}
      </div>
    </div>
  );
};

export default Ticket;
