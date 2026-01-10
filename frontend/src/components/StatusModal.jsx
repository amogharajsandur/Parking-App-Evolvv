import React from 'react';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './StatusModal.module.scss';

const StatusModal = ({ title, message, type = 'info', onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={32} />;
      case 'error': return <AlertCircle size={32} />;
      default: return <Sparkles size={32} />;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalCard} ${styles[type]}`} onClick={e => e.stopPropagation()}>
        <div className={styles.iconBox}>
          {getIcon()}
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
