import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Car, MapPin, CreditCard, Banknote, Landmark, Smartphone as UpiIcon } from 'lucide-react';
import styles from './ConfirmParking.module.scss';

const ConfirmParking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle || { name: 'Toyota Camry', plate: 'MH 12 AB 1234' };
  
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: UpiIcon, color: '#f5f3ff', iconColor: '#8b5cf6' },
    { id: 'netbanking', label: 'Netbanking', icon: Landmark, color: '#eff6ff', iconColor: '#3b82f6' },
    { id: 'card', label: 'Credit Card', icon: CreditCard, color: '#f0fdf4', iconColor: '#22c55e' },
    { id: 'cash', label: 'Cash', icon: Banknote, color: '#fff7ed', iconColor: '#f97316' }
  ];

  const handleParkCar = () => {
    navigate('/ticket', { state: { vehicle, location: 'Inorbit Mall', amount: 150 } });
  };

  return (
    <div className={styles.confirmParkingPage}>
      <header className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>Confirm Parking</h2>
      </header>

      <div className={styles.contentScroll}>
        <div className={styles.autoFillBadge}>
          <CheckCircle size={18} />
          <span>Auto-filled from saved vehicle</span>
        </div>

        <section className={styles.summaryScroll}>
          <div className={`${styles.detailsSection} ${styles.card}`}>
            <div className={styles.sectionHeader}>
              <Car size={18} />
              <h3>Vehicle Details</h3>
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.row}>
                <span className={styles.label}>Owner</span>
                <span className={styles.val}>John Doe</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Vehicle</span>
                <span className={styles.val}>{vehicle.name}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Number Plate</span>
                <span className={styles.val}>{vehicle.plate}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Mobile</span>
                <span className={styles.val}>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <div className={`${styles.locationSection} ${styles.card}`}>
            <div className={styles.sectionHeader}>
              <MapPin size={18} />
              <h3>Parking Location</h3>
            </div>
            <div className={styles.locInfo}>
              <h4>Inorbit Mall</h4>
              <p>Malad West, Mumbai</p>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <div className={styles.sectionTitle}>
              <h3>Payment Method</h3>
              <p>Choose how you want to pay</p>
            </div>
            <div className={styles.paymentGrid}>
              {paymentMethods.map(pm => (
                <div 
                  key={pm.id} 
                  className={`${styles.pmCard} ${paymentMethod === pm.id ? styles.active : ''}`}
                  onClick={() => setPaymentMethod(pm.id)}
                >
                  <div className={styles.pmIcon} style={{ background: pm.color, color: pm.iconColor }}>
                    <pm.icon size={24} />
                  </div>
                  <span>{pm.label}</span>
                  {paymentMethod === pm.id && <div className={styles.selectedDot}><div className={styles.inner}></div></div>}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.amountSection} ${styles.card}`}>
            <div className={styles.row}>
              <span>Base Rate</span>
              <span>₹100</span>
            </div>
            <div className={styles.row}>
              <span>Service Fee</span>
              <span>₹30</span>
            </div>
            <div className={styles.row}>
              <span>GST (18%)</span>
              <span>₹20</span>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
              <span>Total Amount</span>
              <span className={styles.amt}>₹150</span>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.footerAction}>
        <button className={styles.parkBtn} onClick={handleParkCar}>
          <Car size={20} />
          <span>Park My Car</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmParking;
