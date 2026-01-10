import React from 'react';
import { Sparkles, X } from 'lucide-react';
import styles from './ComingSoonModal.module.scss';

const ComingSoonModal = ({ featureName, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
        <div className={styles.iconBox}>
          <Sparkles size={32} />
        </div>
        <div className={styles.content}>
          <h3>Coming Soon</h3>
          <p>
            The <b>{featureName || 'this feature'}</b> is currently under development. We'll be launching it very soon!
          </p>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
