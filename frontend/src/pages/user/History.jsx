import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Car, 
  ChevronDown, 
  Download,
  CreditCard,
  User,
  Calendar
} from 'lucide-react';
import styles from './History.module.scss';

const History = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const historyData = [
    { 
      id: 1, 
      location: 'Phoenix Mall', 
      area: 'Lower Parel, Mumbai', 
      amount: '₹180', 
      status: 'Paid', 
      date: '8 Dec 2025', 
      startTime: '11:30 AM', 
      endTime: '03:45 PM',
      duration: '4h 15m',
      vehicle: 'Toyota Camry (MH 12 AB 1234)', 
      paymentMethod: 'UPI (PhonePe)',
      driver: 'Rajesh Kumar'
    },
    { 
      id: 2, 
      location: 'Central Plaza', 
      area: 'Andheri West, Mumbai', 
      amount: '₹120', 
      status: 'Paid', 
      date: '5 Dec 2025', 
      startTime: '05:00 PM', 
      endTime: '07:50 PM',
      duration: '2h 50m',
      vehicle: 'Toyota Camry (MH 12 AB 1234)', 
      paymentMethod: 'Credit Card',
      driver: 'Sunil Singh'
    },
    { 
      id: 3, 
      location: 'City Center', 
      area: 'Bandra', 
      amount: '₹200', 
      status: 'Paid', 
      date: '3 Dec 2025', 
      startTime: '10:00 AM', 
      endTime: '02:30 PM',
      duration: '4h 30m',
      vehicle: 'Honda City (MH 14 XY 5678)', 
      paymentMethod: 'Cash',
      driver: 'Vikram M'
    },
    { 
      id: 4, 
      location: 'Inorbit Mall', 
      area: 'Malad, Mumbai', 
      amount: '₹150', 
      status: 'Paid', 
      date: '1 Dec 2025', 
      startTime: '01:00 PM', 
      endTime: '04:00 PM',
      duration: '3h 00m',
      vehicle: 'Toyota Camry (MH 12 AB 1234)', 
      paymentMethod: 'UPI (GPay)',
      driver: 'Arun P'
    },
    { 
      id: 5, 
      location: 'R-City Mall', 
      area: 'Ghatkopar, Mumbai', 
      amount: '₹90', 
      status: 'Paid', 
      date: '28 Nov 2025', 
      startTime: '06:00 PM', 
      endTime: '07:30 PM',
      duration: '1h 30m',
      vehicle: 'Toyota Camry (MH 12 AB 1234)', 
      paymentMethod: 'FastTag',
      driver: 'Suresh K'
    },
    { 
      id: 6, 
      location: 'Infinity Mall', 
      area: 'Andheri, Mumbai', 
      amount: '₹220', 
      status: 'Paid', 
      date: '25 Nov 2025', 
      startTime: '11:00 AM', 
      endTime: '04:00 PM',
      duration: '5h 00m',
      vehicle: 'Honda City (MH 14 XY 5678)', 
      paymentMethod: 'Credit Card',
      driver: 'Rahul J'
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.historyPage}>
      <header className={styles.historyHeader}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Parking History</h1>
        </div>
        <p className={styles.summaryText}>You have {historyData.length} past sessions</p>
      </header>

      <div className={styles.historyList}>
        {historyData.map((item) => (
          <div 
            key={item.id} 
            className={`${styles.historyCardWrapper} ${expandedId === item.id ? styles.expanded : ''}`}
          >
            <div className={styles.cardMain} onClick={() => toggleExpand(item.id)}>
              <div className={styles.cardHeader}>
                <div className={styles.locInfo}>
                  <h3>{item.location}</h3>
                  <div className={styles.locSub}>
                    <MapPin size={12} />
                    <span>{item.area}</span>
                  </div>
                </div>
                <div className={styles.amountStatus}>
                  <span className={styles.price}>{item.amount}</span>
                  <span className={styles.statusBadge}>{item.status}</span>
                </div>
              </div>
              
              <div className={styles.cardMeta}>
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>{item.duration}</span>
                </div>
                <ChevronDown size={20} className={styles.arrow} />
              </div>
            </div>

            {expandedId === item.id && (
              <div className={styles.cardDetails}>
                <div className={styles.detailsDivider}></div>
                <h4>Session Details</h4>
                
                <div className={styles.detailsList}>
                  <div className={styles.detailRow}>
                    <div className={styles.labelIcon}>
                      <Car size={16} />
                      <span>Vehicle</span>
                    </div>
                    <span className={styles.val}>{item.vehicle}</span>
                  </div>

                  <div className={`${styles.detailRow} ${styles.split}`}>
                    <div className={styles.splitItem}>
                      <label>Check In</label>
                      <p>{item.startTime}</p>
                    </div>
                    <div className={`${styles.splitItem} ${styles.textRight}`}>
                      <label>Check Out</label>
                      <p>{item.endTime}</p>
                    </div>
                  </div>

                  <div className={styles.durationHighlight}>
                    <span>Total Duration</span>
                    <span className={styles.time}>{item.duration}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.labelIcon}>
                      <CreditCard size={16} />
                      <span>Payment</span>
                    </div>
                    <span className={styles.val}>{item.paymentMethod}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.labelIcon}>
                      <User size={16} />
                      <span>Valet</span>
                    </div>
                    <span className={styles.val}>{item.driver}</span>
                  </div>
                </div>

                <button className={styles.downloadBtn}>
                  <Download size={18} />
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;