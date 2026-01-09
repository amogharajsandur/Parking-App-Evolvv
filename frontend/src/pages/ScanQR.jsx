import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, QrCode, Car, ChevronRight, Plus, ArrowLeft } from 'lucide-react';
import styles from './ScanQR.module.scss';

const ScanQR = () => {
  const navigate = useNavigate();
  const [showVehicles, setShowVehicles] = useState(false);
  const vehicles = [
    { id: 1, name: 'Toyota Camry', plate: 'MH 12 AB 1234' },
    { id: 2, name: 'Honda City', plate: 'MH 14 CD 5678' }
  ];

  useEffect(() => {
    // Simulate finding a QR code after 2 seconds
    const timer = setTimeout(() => {
      setShowVehicles(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectVehicle = (vehicle) => {
    navigate('/confirm', { state: { vehicle } });
  };

  return (
    <div className={styles.scanQrPage}>
      <header className={styles.scanHeader}>
        <button className={styles.closeBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2>Scan QR Code</h2>
      </header>

      <div className={styles.scannerContainer} onClick={() => setShowVehicles(true)}>
        <div className={styles.scanFrame}>
          <div className={`${styles.corner} ${styles.topLeft}`}></div>
          <div className={`${styles.corner} ${styles.topRight}`}></div>
          <div className={`${styles.corner} ${styles.bottomRight}`}></div>
          <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
          <QrCode size={120} className={styles.qrIcon} />
        </div>
        <div className={styles.scanText}>
          <h3>Align QR Code</h3>
          <p>Scanning will start automatically</p>
        </div>
      </div>

      <div className={`${styles.vehicleSheet} ${showVehicles ? styles.open : ''}`}>
        <div className={styles.handle}></div>
        <h3>Select Vehicle</h3>
        <p className={styles.subtitle}>Choose which vehicle you are parking</p>

        <div className={styles.vehicleList}>
          {vehicles.map(v => (
            <div key={v.id} className={styles.vehicleItem} onClick={() => handleSelectVehicle(v)}>
              <div className={styles.vIcon}>
                <Car size={24} />
              </div>
              <div className={styles.vInfo}>
                <h4>{v.name}</h4>
                <span>{v.plate}</span>
              </div>
              <ChevronRight size={20} className={styles.arrow} />
            </div>
          ))}
        </div>

        <button className={styles.registerBtn} onClick={() => navigate('/manage-vehicles')}>
          <Plus size={20} style={{ marginRight: 8 }} />
          Register New Vehicle
        </button>
      </div>
    </div>
  );
};

export default ScanQR;
